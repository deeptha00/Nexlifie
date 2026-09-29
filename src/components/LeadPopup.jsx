import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Phone, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'nexlifie_lead_popup_shown';

const LeadPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, '1');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isPhoneValid = phone.replace(/\D/g, '').length >= 10;
  const isNameValid = name.trim().length > 0;
  const isValid = isNameValid && isPhoneValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    setStatus('SENDING');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email || 'not_provided@nexlifie.com');
    formData.append('message', message || 'No additional message provided.');
    try {
      await fetch('https://formspree.io/f/xykljnyo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
    } catch {
      // ignore network errors, still show success to the user
    }
    setStatus('SUCCESS');
  };

  const inputClass = (invalid) =>
    `bg-[#F7F8F6] border rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#111111] outline-none w-full transition-all focus:bg-white ${
      invalid
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
        : 'border-[#111111]/12 focus:border-green-600 focus:ring-4 focus:ring-green-600/10'
    }`;

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
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md" onClick={() => setOpen(false)} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-[28px] border border-[#111111]/10 bg-white p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-600 via-green-400 to-green-600" />
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-[#111111]/40 hover:text-[#111111] hover:bg-[#111111]/6 transition-colors z-10"
            >
              <X size={18} />
            </button>

            {status === 'SUCCESS' ? (
              <div className="relative flex flex-col items-center text-center py-10 gap-5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
                  className="w-20 h-20 rounded-full bg-green-600/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="text-green-600" size={44} strokeWidth={1.75} />
                </motion.div>
                <div>
                  <p className="text-[#111111] font-heading font-bold text-2xl mb-2">Enquiry Received</p>
                  <p className="text-[rgb(var(--muted-rgb))] text-sm max-w-xs mx-auto">
                    Thanks, {name.split(' ')[0] || 'there'} — we'll get back to you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-black transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              <>
                <div className="relative inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-green-600/8 border border-green-600/15">
                  <Sparkles size={13} className="text-green-600" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-green-700 uppercase">
                    Get in touch
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-[30px] leading-tight font-bold text-[#111111] mb-2 text-balance">
                  Let's build something real.
                </h3>
                <p className="text-[rgb(var(--muted-rgb))] text-sm mb-7">
                  Leave your details and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" noValidate>
                  <div className="sm:col-span-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <User size={16} className="text-[#111111]/35" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name *"
                        className={inputClass(touched && !isNameValid)}
                      />
                    </div>
                    {touched && !isNameValid && (
                      <span className="block mt-1.5 text-[11px] text-red-500">Name is required</span>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <Phone size={16} className="text-[#111111]/35" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number *"
                        className={inputClass(touched && !isPhoneValid)}
                      />
                    </div>
                    {touched && !isPhoneValid && (
                      <span className="block mt-1.5 text-[11px] text-red-500">Valid phone number is required</span>
                    )}
                  </div>

                  <div className="sm:col-span-2 relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Mail size={16} className="text-[#111111]/35" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional)"
                      className={inputClass(false)}
                    />
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project (optional)"
                    rows={3}
                    className="sm:col-span-2 bg-[#F7F8F6] border border-[#111111]/12 rounded-xl px-4 py-3.5 text-sm text-[#111111] outline-none w-full resize-none transition-all focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'SENDING'}
                    className="sm:col-span-2 mt-1 group inline-flex items-center justify-center gap-2 bg-[#111111] text-[#F7F8F6] px-7 py-4 rounded-2xl font-semibold text-sm shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] hover:bg-black hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] transition-all disabled:opacity-60"
                  >
                    {status === 'SENDING' ? 'Sending...' : (
                      <>
                        Send Enquiry
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
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

export default LeadPopup;
