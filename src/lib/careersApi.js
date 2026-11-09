/**
 * Client for the Google Apps Script Web App that backs the Careers page.
 * See google-apps-script/Code.gs and google-apps-script/README.md for the
 * server side and deployment steps.
 *
 * The script URL is never hardcoded — it comes from an env var so it can
 * differ between local dev and production without touching source.
 */
const SCRIPT_URL = import.meta.env.VITE_CAREERS_SCRIPT_URL;

export const CAREERS_SCRIPT_CONFIGURED = Boolean(SCRIPT_URL);

export const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5MB
export const RESUME_ACCEPT = '.pdf,.doc,.docx';
const RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const isValidResumeFile = (file) => {
  if (!file) return false;
  if (file.size > RESUME_MAX_BYTES) return false;
  if (RESUME_MIME_TYPES.includes(file.type)) return true;
  // Some browsers/OSes report an empty or generic mimetype for .doc/.docx —
  // fall back to the extension so a valid file isn't rejected on that alone.
  return /\.(pdf|docx?|)$/i.test(file.name) && /\.(pdf|docx?)$/i.test(file.name);
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // dataURL looks like "data:<mime>;base64,<data>" — we only want the data.
      const base64 = String(reader.result).split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });

/**
 * Live, server-verified application counts + closed state per job id.
 * Used to reflect "Applications Closed" on the site even when a limit was
 * reached organically, not just via the status flag in careers.js.
 * Fails soft — an unreachable script just means the page falls back to the
 * static `status` field in careers.js.
 */
export async function fetchJobStatus() {
  if (!SCRIPT_URL) return { counts: {}, closed: [] };
  try {
    const res = await fetch(`${SCRIPT_URL}?action=counts`);
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    return { counts: data.counts || {}, closed: data.closed || [] };
  } catch {
    return { counts: {}, closed: [] };
  }
}

/**
 * Submits an application. Sends plain-text JSON (not application/json) so
 * the browser treats it as a "simple request" and skips the CORS preflight
 * that Apps Script Web Apps don't handle — the standard, well-documented
 * workaround for posting to Apps Script from a static frontend.
 */
export async function submitApplication({ job, fields, resumeFile }) {
  if (!SCRIPT_URL) {
    throw new Error('The careers application service isn\'t configured yet. Please email your resume to info@nexlifie.com instead.');
  }

  const resumeBase64 = await fileToBase64(resumeFile);

  const payload = {
    action: 'apply',
    jobId: job.id,
    jobTitle: job.title,
    ...fields,
    resume: {
      filename: resumeFile.name,
      mimeType: resumeFile.type || 'application/octet-stream',
      base64: resumeBase64,
    },
  };

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // fall through to the generic error below
  }

  if (!res.ok || !data || data.status !== 'success') {
    throw new Error(data?.message || 'Something went wrong submitting your application. Please try again.');
  }

  return data;
}
