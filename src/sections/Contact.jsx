import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../lib/motion';
import { business } from '../lib/siteConfig';

const Contact = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  // A page can arrive here with ?message=... already filled in (e.g. the Media
  // page's growth-stack builder), so the enquiry that lands is already scoped.
  const [searchParams] = useSearchParams();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState(() => searchParams.get('message') || '');
  const [formStatus, setFormStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS
  const [formTouched, setFormTouched] = useState(false);

  const isFormPhoneValid = formPhone.replace(/\D/g, '').length >= 10;
  const isFormNameValid = formName.trim().length > 0;
  const isFormValid = isFormNameValid && isFormPhoneValid;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormTouched(true);
    if (!isFormValid) return;

    setFormStatus('SENDING');
    const formData = new FormData();
    formData.append('name', formName);
    formData.append('phone', formPhone);
    formData.append('email', formEmail || 'not_provided@nexlifie.com');
    formData.append('message', formMessage || 'No additional message provided.');
    try {
      await fetch('https://formspree.io/f/xykljnyo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
    } catch {
      // ignore network errors, still show success to the user
    }
    setFormStatus('SUCCESS');
  };

  const inputClass = (invalid) =>
    `bg-[#F7F8F6] border rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#111111] outline-none w-full transition-colors ${
      invalid ? 'border-red-400 focus:border-red-500' : 'border-[#111111]/12 focus:border-green-600'
    }`;

  return (
    <section id="contact" className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left Side */}
          <motion.div {...fadeUp(0)} className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-green-600" />
              <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">GET IN TOUCH</span>
            </div>
            <Heading className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] mb-6 text-balance">
              Let's build<br />something real.
            </Heading>
            <p className="text-[rgb(var(--muted-rgb))] text-base md:text-lg leading-relaxed max-w-md mb-10">
              Tell us what you're building, or send a quick enquiry and we'll get back to you.
            </p>

            <div className="flex flex-col gap-6 border-t border-[rgb(var(--ink-rgb)/12%)] pt-8">
              <a href="mailto:info@nexlifie.com" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl border border-[rgb(var(--ink-rgb)/15%)] flex items-center justify-center text-[rgb(var(--ink-rgb)/50%)] group-hover:border-green-600 group-hover:text-green-600 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[rgb(var(--muted-rgb))] tracking-[0.3em] block mb-1">EMAIL</span>
                  <p className="text-base font-semibold text-[var(--secondary)]">info@nexlifie.com</p>
                </div>
              </a>
              <a href="tel:+919591522856" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl border border-[rgb(var(--ink-rgb)/15%)] flex items-center justify-center text-[rgb(var(--ink-rgb)/50%)] group-hover:border-green-600 group-hover:text-green-600 group-hover:scale-105 transition-all duration-300 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[rgb(var(--muted-rgb))] tracking-[0.3em] block mb-1">PHONE</span>
                  <p className="text-base font-semibold text-[var(--secondary)]">{business.phone}</p>
                </div>
              </a>
              {/* Visible NAP — must match the Google Business Profile exactly. */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl border border-[rgb(var(--ink-rgb)/15%)] flex items-center justify-center text-[rgb(var(--ink-rgb)/50%)] shrink-0">
                  <MapPin size={18} />
                </div>
                <address className="not-italic">
                  <span className="text-[10px] font-mono text-[rgb(var(--muted-rgb))] tracking-[0.3em] block mb-1">LOCATION</span>
                  <p className="text-base font-semibold text-[var(--secondary)]">{business.addressLine}</p>
                  <p className="text-xs text-[rgb(var(--muted-rgb))] mt-1">Working with clients worldwide</p>
                </address>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-7 rounded-2xl border border-[#111111]/12 bg-white p-7 md:p-10 shadow-[var(--shadow-soft)]">
            {formStatus === 'SUCCESS' ? (
              <div className="flex flex-col items-center text-center py-12 gap-4">
                <CheckCircle2 className="text-green-600" size={40} />
                <p className="text-[#111111] font-bold text-lg">Enquiry Received</p>
                <p className="text-[rgb(var(--muted-rgb))] text-sm">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5" noValidate>
                <div className="sm:col-span-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User size={16} className="text-[#111111]/35" />
                    </div>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Your Name *"
                      className={inputClass(formTouched && !isFormNameValid)}
                    />
                  </div>
                  {formTouched && !isFormNameValid && (
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
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className={inputClass(formTouched && !isFormPhoneValid)}
                    />
                  </div>
                  {formTouched && !isFormPhoneValid && (
                    <span className="block mt-1.5 text-[11px] text-red-500">Valid phone number is required</span>
                  )}
                </div>

                <div className="sm:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail size={16} className="text-[#111111]/35" />
                  </div>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Email (optional)"
                    className={inputClass(false)}
                  />
                </div>

                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell us about your project (optional)"
                  rows={4}
                  className="sm:col-span-2 bg-[#F7F8F6] border border-[#111111]/12 rounded-xl px-4 py-3.5 text-sm text-[#111111] outline-none w-full resize-none transition-colors focus:border-green-600"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'SENDING'}
                  className="sm:col-span-2 group inline-flex items-center justify-center gap-2 bg-[#111111] text-[#F7F8F6] px-7 py-4 rounded-2xl font-semibold text-sm hover:bg-black transition-colors disabled:opacity-60"
                >
                  {formStatus === 'SENDING' ? 'Sending...' : (
                    <>
                      Send Enquiry
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
