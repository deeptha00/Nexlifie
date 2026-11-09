/**
 * Nexlifie Careers — Google Apps Script backend.
 *
 * This is the entire "backend" for the /careers page: it receives job
 * applications, uploads the resume to Drive, logs the applicant to a Sheet,
 * and enforces the per-job application limit server-side (never trust the
 * frontend alone for that). See README.md in this folder for how to deploy
 * this as a Web App and wire it up to the website.
 *
 * SETUP — fill these in via File > Project properties > Script properties,
 * OR just edit the constants below directly. Script properties are
 * preferred so you're not editing code to change an ID.
 *   SHEET_ID         — the Spreadsheet ID that stores applications.
 *   DRIVE_FOLDER_ID  — the Drive folder ID resumes get uploaded into.
 */

const SHEET_NAME = 'Applications';

const SHEET_HEADERS = [
  'Application ID',
  'Application Date',
  'Job ID',
  'Job Title',
  'Full Name',
  'Email',
  'Phone',
  'Location',
  'Experience',
  'Employment Status',
  'Skills',
  'Notice Period',
  'LinkedIn URL',
  'Portfolio URL',
  'Expected Salary',
  'Cover Message',
  'Resume File Name',
  'Resume Drive Link',
  'Application Status',
];

/**
 * Mirrors the `maxApplicants` values in src/data/careers.js on the website.
 * This is intentionally duplicated here rather than trusted from the
 * request — a client could otherwise send any limit it likes. Whenever you
 * add, remove, or re-limit a role in careers.js, update this map too.
 */
const JOB_LIMITS = {
  'social-media-manager': 50,
  'hr-intern': 50,
  'business-development-executive': 50,
  '3d-artist-designer': 50,
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/* ───────────────────────── helpers ───────────────────────── */

function getProp_(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function getSheet_() {
  const sheetId = getProp_('SHEET_ID');
  if (!sheetId) throw new Error('SHEET_ID script property is not set.');
  const ss = SpreadsheetApp.openById(sheetId);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getDriveFolder_() {
  const folderId = getProp_('DRIVE_FOLDER_ID');
  if (!folderId) throw new Error('DRIVE_FOLDER_ID script property is not set.');
  return DriveApp.getFolderById(folderId);
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function sanitize_(value, maxLen) {
  if (value === undefined || value === null) return '';
  const str = String(value).trim().replace(/[\r\n]+/g, ' ');
  return maxLen ? str.slice(0, maxLen) : str;
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Counts existing applications for a job id by scanning the "Job ID" column. */
function countApplications_(sheet, jobId) {
  const data = sheet.getDataRange().getValues();
  const jobIdCol = SHEET_HEADERS.indexOf('Job ID');
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i][jobIdCol] === jobId) count++;
  }
  return count;
}

function hasDuplicateApplication_(sheet, jobId, email) {
  const data = sheet.getDataRange().getValues();
  const jobIdCol = SHEET_HEADERS.indexOf('Job ID');
  const emailCol = SHEET_HEADERS.indexOf('Email');
  for (let i = 1; i < data.length; i++) {
    if (data[i][jobIdCol] === jobId && String(data[i][emailCol]).toLowerCase() === email.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function buildResumeFilename_(jobTitle, applicantName, extension) {
  const slug = (str) =>
    String(str)
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  const dateStr = Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd');
  return `${slug(jobTitle)}_${slug(applicantName)}_${dateStr}.${extension}`;
}

function extensionFromMime_(mimeType, originalName) {
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType === 'application/msword') return 'doc';
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
  const match = /\.([a-zA-Z0-9]+)$/.exec(originalName || '');
  return match ? match[1] : 'pdf';
}

/* ───────────────────────── entry points ───────────────────────── */

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === 'counts') {
      const sheet = getSheet_();
      const counts = {};
      const closed = [];
      Object.keys(JOB_LIMITS).forEach((jobId) => {
        const count = countApplications_(sheet, jobId);
        counts[jobId] = count;
        if (count >= JOB_LIMITS[jobId]) closed.push(jobId);
      });
      return jsonOutput_({ status: 'success', counts, closed });
    }
    return jsonOutput_({ status: 'success', message: 'Nexlifie Careers API is running.' });
  } catch (err) {
    return jsonOutput_({ status: 'error', message: err.message });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.action !== 'apply') {
      return jsonOutput_({ status: 'error', message: 'Unknown action.' });
    }

    const jobId = sanitize_(payload.jobId, 100);
    const jobTitle = sanitize_(payload.jobTitle, 200);
    const fullName = sanitize_(payload.fullName, 150);
    const email = sanitize_(payload.email, 150).toLowerCase();
    const phone = sanitize_(payload.phone, 40);
    const location = sanitize_(payload.location, 150);
    const experience = sanitize_(payload.experience, 100);
    const employmentStatus = sanitize_(payload.employmentStatus, 50);
    const skills = sanitize_(payload.skills, 500);
    const noticePeriod = sanitize_(payload.noticePeriod, 100);
    const linkedin = sanitize_(payload.linkedin, 300);
    const portfolio = sanitize_(payload.portfolio, 300);
    const expectedSalary = sanitize_(payload.expectedSalary, 100);
    const whyInterested = sanitize_(payload.whyInterested, 2000);
    const comments = sanitize_(payload.comments, 2000);
    const resume = payload.resume || {};

    // ── Server-side validation — never trust the client alone. ──
    const requiredCheck = { jobId, jobTitle, fullName, email, phone, location, experience, employmentStatus, skills, noticePeriod, whyInterested };
    const missing = Object.keys(requiredCheck).filter((key) => !requiredCheck[key]);
    if (missing.length) {
      return jsonOutput_({ status: 'error', message: `Missing required field(s): ${missing.join(', ')}` });
    }
    if (!isValidEmail_(email)) {
      return jsonOutput_({ status: 'error', message: 'Invalid email address.' });
    }
    if (!JOB_LIMITS.hasOwnProperty(jobId)) {
      return jsonOutput_({ status: 'error', message: 'Unknown job id. This role may no longer be configured.' });
    }
    if (!resume.base64 || !resume.filename) {
      return jsonOutput_({ status: 'error', message: 'Resume file is required.' });
    }
    if (!ALLOWED_RESUME_MIME_TYPES.includes(resume.mimeType)) {
      return jsonOutput_({ status: 'error', message: 'Resume must be a PDF, DOC, or DOCX file.' });
    }

    const resumeBytes = Utilities.base64Decode(resume.base64);
    if (resumeBytes.length > MAX_RESUME_BYTES) {
      return jsonOutput_({ status: 'error', message: 'Resume file is too large (max 5MB).' });
    }

    const sheet = getSheet_();

    // ── Application limit, enforced here (not just in the frontend). ──
    const currentCount = countApplications_(sheet, jobId);
    if (currentCount >= JOB_LIMITS[jobId]) {
      return jsonOutput_({ status: 'error', message: 'Applications for this position are closed.', closed: true });
    }

    // ── Duplicate guard: same person, same role. ──
    if (hasDuplicateApplication_(sheet, jobId, email)) {
      return jsonOutput_({ status: 'error', message: 'You\'ve already applied for this role with this email address.' });
    }

    // ── Upload resume to Drive. ──
    const extension = extensionFromMime_(resume.mimeType, resume.filename);
    const resumeFilename = buildResumeFilename_(jobTitle, fullName, extension);
    const blob = Utilities.newBlob(resumeBytes, resume.mimeType, resumeFilename);
    const folder = getDriveFolder_();
    const file = folder.createFile(blob);
    // Restricted to the company's Drive (no ANYONE sharing) — only users
    // already granted access to the folder/file can open it.

    // ── Log to the sheet. ──
    const applicationId = `APP-${Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyyMMdd-HHmmss')}-${Math.floor(Math.random() * 900 + 100)}`;
    sheet.appendRow([
      applicationId,
      new Date(),
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      location,
      experience,
      employmentStatus,
      skills,
      noticePeriod,
      linkedin,
      portfolio,
      expectedSalary,
      [whyInterested, comments].filter(Boolean).join(' | '),
      resumeFilename,
      file.getUrl(),
      'New',
    ]);

    return jsonOutput_({ status: 'success', applicationId });
  } catch (err) {
    return jsonOutput_({ status: 'error', message: err.message });
  }
}
