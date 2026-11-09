# Careers — Google Apps Script backend

This is the "backend" for the `/careers` page on nexlifie.com. There's no server
and no database — applications go straight into a Google Sheet, resumes go
straight into a Google Drive folder, and a Google Apps Script Web App is the
thin layer that connects the website to both, safely (the browser never
touches Drive/Sheets credentials directly).

## 1. Create the Google Sheet

1. Create a new Google Sheet — name it something like **Nexlifie Careers —
   Applications**.
2. You don't need to add headers yourself — the script creates an
   **Applications** tab with the correct header row the first time it runs.
   (If you'd rather set it up yourself, create a sheet/tab named
   `Applications` with these columns, in this order:)

   `Application ID | Application Date | Job ID | Job Title | Full Name | Email | Phone | Location | Experience | Employment Status | Skills | Notice Period | LinkedIn URL | Portfolio URL | Expected Salary | Cover Message | Resume File Name | Resume Drive Link | Application Status`

3. Copy the Sheet's ID from its URL:
   `https://docs.google.com/spreadsheets/d/<THIS_IS_THE_ID>/edit`
4. **Keep this sheet private** — do not turn on "Anyone with the link can
   view/edit". Only share it with people at Nexlifie who need to see
   applicants.

## 2. Create the Drive folder for resumes

1. In Google Drive, create a folder — e.g. **Nexlifie Careers — Resumes**.
2. Copy its folder ID from the URL:
   `https://drive.google.com/drive/folders/<THIS_IS_THE_ID>`
3. Leave sharing on this folder restricted to your organization/authorized
   users — resumes should not be publicly accessible.

## 3. Create the Apps Script project

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Delete the default `Code.gs` contents and paste in the contents of
   [`Code.gs`](./Code.gs) from this folder.
3. In the editor, go to **Project Settings** (gear icon) → **Script
   Properties** → **Add script property**, and add:
   - `SHEET_ID` → the Spreadsheet ID from step 1
   - `DRIVE_FOLDER_ID` → the folder ID from step 2
4. If you change any `maxApplicants` values in `src/data/careers.js` on the
   website, update the matching `JOB_LIMITS` map at the top of `Code.gs` too
   — this is what the script uses to independently enforce the application
   cap, so the two need to stay in sync whenever a role's limit changes.

## 4. Deploy as a Web App

1. Click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" → **Web app**.
3. Configure:
   - **Execute as:** Me (your account) — this is what lets the script write
     to your Sheet/Drive regardless of who calls the public URL.
   - **Who has access:** Anyone — the website calls this URL from a
     visitor's browser, so it can't require a Google sign-in.
4. Click **Deploy**, authorize the requested permissions (Sheets + Drive),
   and copy the resulting **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 5. Wire it up to the website

In the project root, create a `.env` file (copy `.env.example`) with:

```
VITE_CAREERS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Restart the dev server (`npm run dev`) or rebuild (`npm run build`) after
adding this — Vite only reads env vars at startup/build time.

Until this is set, the Careers page still works (jobs display using the
static `status` field in `careers.js`), but the Apply form will show a
message asking applicants to email their resume instead of submitting.

## 6. Redeploying after changes

Every time you edit `Code.gs`, you must create a **new deployment version**
(or use **Manage deployments** → edit → **New version**) for the change to
take effect — saving the script alone does not update the live Web App.

## How application limits are enforced

- `src/data/careers.js` on the website is the source of truths for job
  **content** (title, description, etc.) and is what a visitor sees.
- `Code.gs`'s `JOB_LIMITS` map is the source of truth for the **enforced
  cap** — every submission is checked against the live count of rows in the
  Sheet for that Job ID, server-side, before it's accepted. A client cannot
  bypass this by sending a different limit.
- The website also calls `?action=counts` on page load to show a live
  "Closed" badge once a role fills up, even if nobody has updated
  `careers.js`'s `status` field yet.
- To hard-close a role regardless of applicant count, set
  `status: 'closed'` for that job in `src/data/careers.js`.

## Security notes

- No API keys or Drive/Sheets credentials ever reach the browser — the
  script runs entirely server-side under your Google account.
- The frontend posts as `text/plain` (not `application/json`) specifically
  so the browser treats it as a "simple request" and skips a CORS
  preflight — Apps Script Web Apps don't implement `OPTIONS` handling, so a
  preflighted request would otherwise fail. `Code.gs` parses the body as
  JSON regardless of the declared content type.
- All fields are re-validated and sanitized server-side in `doPost` — never
  rely on the frontend's validation alone.
- Resumes are validated for MIME type and size (5MB) server-side before
  being written to Drive.
