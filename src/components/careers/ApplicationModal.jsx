import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, UploadCloud, FileText, Loader2 } from 'lucide-react';
import { submitApplication, isValidResumeFile, RESUME_MAX_BYTES, RESUME_ACCEPT } from '../../lib/careersApi';

const employmentStatusOptions = ['Employed', 'Unemployed', 'Student', 'Freelancer'];

const emptyFields = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  portfolio: '',
  experience: '',
  employmentStatus: '',
  skills: '',
  noticePeriod: '',
  expectedSalary: '',
  whyInterested: '',
  comments: '',
};

const requiredFields = ['fullName', 'email', 'phone', 'location', 'experience', 'employmentStatus', 'skills', 'noticePeriod', 'whyInterested'];

const formatBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)}MB`;

/**
 * job: the opening being applied to, or null (closed = modal hidden).
 * onClose: () => void.
 */
const ApplicationModal = ({ job, onClose }) => {
  const [fields, setFields] = useState(emptyFields);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR
  const [errorMessage, setErrorMessage] = useState('');
  const submittedRef = useRef(false);
  const fileInputRef = useRef(null);

  const open = Boolean(job);

  const handleClose = () => {
    if (status === 'SENDING') return;
    onClose();
    // Reset after the exit animation has had time to run.
    setTimeout(() => {
      setFields(emptyFields);
      setResumeFile(null);
      setResumeError('');
      setTouched(false);
      setStatus('IDLE');
      setErrorMessage('');
      submittedRef.current = false;
    }, 300);
  };

  const setField = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setResumeFile(null);
      return;
    }
    if (!isValidResumeFile(file)) {
      setResumeError(
        file.size > RESUME_MAX_BYTES
          ? `File is too large — please keep it under ${formatBytes(RESUME_MAX_BYTES)}.`
          : 'Please upload a PDF, DOC, or DOCX file.'
      );
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setResumeError('');
    setResumeFile(file);
  };

  const missingFields = requiredFields.filter((key) => !fields[key].trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  const isPhoneValid = fields.phone.replace(/\D/g, '').length >= 10;
  const isValid = missingFields.length === 0 && isEmailValid && isPhoneValid && Boolean(resumeFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || submittedRef.current) return;

    submittedRef.current = true;
    setStatus('SENDING');
    setErrorMessage('');
    try {
      await submitApplication({ job, fields, resumeFile });
      setStatus('SUCCESS');
    } catch (err) {
      setStatus('ERROR');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      submittedRef.current = false;
    }
  };

  const inputClass = (invalid) =>
    `bg-[#F7F8F6] border rounded-xl px-4 py-3 text-sm text-[#111111] outline-none w-full transition-all focus:bg-white ${
      invalid
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
        : 'border-[#111111]/12 focus:border-green-600 focus:ring-4 focus:ring-green-600/10'
    }`;

  const fieldError = (key, message) => touched && !fields[key].trim() && <span className="block mt-1 text-[11px] text-red-500">{message}</span>;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
        >
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl max-h-[88vh] rounded-[28px] border border-[#111111]/10 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-600 via-green-400 to-green-600 z-10" />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-[#111111]/40 hover:text-[#111111] hover:bg-[#111111]/6 transition-colors z-20"
            >
              <X size={18} />
            </button>

            {status === 'SUCCESS' ? (
              <div className="relative flex flex-col items-center text-center py-16 px-8 gap-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
                  className="w-20 h-20 rounded-full bg-green-600/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="text-green-600" size={44} strokeWidth={1.75} />
                </motion.div>
                <div>
                  <p className="text-[#111111] font-heading font-bold text-2xl mb-2">Application Submitted</p>
                  <p className="text-[rgb(var(--muted-rgb))] text-sm max-w-sm mx-auto">
                    Thanks, {fields.fullName.split(' ')[0] || 'there'} — we've received your application for {job?.title}. We'll reach out if there's a fit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-2 inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="px-8 pt-8 pb-5 border-b border-[#111111]/8 shrink-0">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-green-600 uppercase">Apply for</span>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-[#111111] mt-1 pr-8">{job?.title}</h3>
                </div>

                <form onSubmit={handleSubmit} noValidate className="overflow-y-auto px-8 py-6 flex flex-col gap-7">
                  {/* Personal Information */}
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.2em] text-[rgb(var(--muted-rgb))] uppercase mb-3">Personal Information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input type="text" value={fields.fullName} onChange={setField('fullName')} placeholder="Full Name *" className={inputClass(touched && !fields.fullName.trim())} />
                        {fieldError('fullName', 'Full name is required')}
                      </div>
                      <div>
                        <input type="email" value={fields.email} onChange={setField('email')} placeholder="Email Address *" className={inputClass(touched && !isEmailValid)} />
                        {touched && !isEmailValid && <span className="block mt-1 text-[11px] text-red-500">A valid email is required</span>}
                      </div>
                      <div>
                        <input type="tel" value={fields.phone} onChange={setField('phone')} placeholder="Phone Number *" className={inputClass(touched && !isPhoneValid)} />
                        {touched && !isPhoneValid && <span className="block mt-1 text-[11px] text-red-500">A valid phone number is required</span>}
                      </div>
                      <div>
                        <input type="text" value={fields.location} onChange={setField('location')} placeholder="Current Location *" className={inputClass(touched && !fields.location.trim())} />
                        {fieldError('location', 'Current location is required')}
                      </div>
                      <input type="url" value={fields.linkedin} onChange={setField('linkedin')} placeholder="LinkedIn Profile URL (optional)" className={inputClass(false)} />
                      <input type="url" value={fields.portfolio} onChange={setField('portfolio')} placeholder="Portfolio / GitHub URL (optional)" className={inputClass(false)} />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.2em] text-[rgb(var(--muted-rgb))] uppercase mb-3">Professional Information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input type="text" value={fields.experience} onChange={setField('experience')} placeholder="Total Experience (e.g. 2 Years) *" className={inputClass(touched && !fields.experience.trim())} />
                        {fieldError('experience', 'Total experience is required')}
                      </div>
                      <div>
                        <select value={fields.employmentStatus} onChange={setField('employmentStatus')} className={inputClass(touched && !fields.employmentStatus.trim())}>
                          <option value="">Current Employment Status *</option>
                          {employmentStatusOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {fieldError('employmentStatus', 'Please select your employment status')}
                      </div>
                      <div className="sm:col-span-2">
                        <input type="text" value={fields.skills} onChange={setField('skills')} placeholder="Relevant Skills (comma separated) *" className={inputClass(touched && !fields.skills.trim())} />
                        {fieldError('skills', 'Relevant skills are required')}
                      </div>
                      <div>
                        <input type="text" value={fields.noticePeriod} onChange={setField('noticePeriod')} placeholder="Notice Period (e.g. 30 Days) *" className={inputClass(touched && !fields.noticePeriod.trim())} />
                        {fieldError('noticePeriod', 'Notice period is required')}
                      </div>
                      <input type="text" value={fields.expectedSalary} onChange={setField('expectedSalary')} placeholder="Current / Expected Salary (optional)" className={inputClass(false)} />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.2em] text-[rgb(var(--muted-rgb))] uppercase mb-3">Resume / CV *</p>
                    <label
                      htmlFor="careers-resume-upload"
                      className={`flex items-center gap-3 rounded-xl border border-dashed px-4 py-4 cursor-pointer transition-colors ${
                        resumeFile ? 'border-green-600/50 bg-green-600/5' : 'border-[#111111]/20 hover:border-green-600/50 hover:bg-green-600/5'
                      }`}
                    >
                      {resumeFile ? <FileText size={18} className="text-green-600 shrink-0" /> : <UploadCloud size={18} className="text-[#111111]/40 shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm text-[#111111] font-medium truncate">{resumeFile ? resumeFile.name : 'Click to upload your resume'}</p>
                        <p className="text-[11px] text-[rgb(var(--muted-rgb))]">PDF, DOC or DOCX — up to {formatBytes(RESUME_MAX_BYTES)}</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        id="careers-resume-upload"
                        type="file"
                        accept={RESUME_ACCEPT}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {resumeError && <span className="block mt-1.5 text-[11px] text-red-500">{resumeError}</span>}
                    {touched && !resumeFile && !resumeError && <span className="block mt-1.5 text-[11px] text-red-500">Resume upload is required</span>}
                  </div>

                  {/* Additional */}
                  <div>
                    <p className="text-[11px] font-mono tracking-[0.2em] text-[rgb(var(--muted-rgb))] uppercase mb-3">Additional Information</p>
                    <div className="flex flex-col gap-4">
                      <div>
                        <textarea
                          value={fields.whyInterested}
                          onChange={setField('whyInterested')}
                          placeholder="Why are you interested in joining Nexlifie? *"
                          rows={3}
                          className={`${inputClass(touched && !fields.whyInterested.trim())} resize-none`}
                        />
                        {fieldError('whyInterested', 'This field is required')}
                      </div>
                      <textarea
                        value={fields.comments}
                        onChange={setField('comments')}
                        placeholder="Additional comments (optional)"
                        rows={2}
                        className={`${inputClass(false)} resize-none`}
                      />
                    </div>
                  </div>

                  {status === 'ERROR' && (
                    <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                      <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 leading-relaxed">{errorMessage}</p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: status === 'SENDING' ? 1 : 1.01 }}
                    whileTap={{ scale: status === 'SENDING' ? 1 : 0.98 }}
                    disabled={status === 'SENDING'}
                    className="group inline-flex items-center justify-center gap-2 bg-[#111111] text-[#F7F8F6] px-7 py-4 rounded-2xl font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:bg-black hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-all disabled:opacity-60"
                  >
                    {status === 'SENDING' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;
