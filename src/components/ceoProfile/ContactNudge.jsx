import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { popup, profile } from '../../data/ceoProfileContent';

/** Small, dismissible corner card that invites a conversation after a short delay. */
export default function ContactNudge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const goToContact = () => {
    setVisible(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="dialog"
          aria-label="Get in touch"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-50 w-[min(340px,calc(100vw-2rem))] rounded-2xl border border-[rgb(var(--ceo-ink-rgb)/10%)] bg-[rgb(var(--ceo-surface-rgb))] p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] sm:bottom-6 sm:right-6"
        >
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-full p-1 text-[rgb(var(--ceo-ink-faint-rgb))] transition-colors hover:bg-[rgb(var(--ceo-bg-alt-rgb))] hover:text-[rgb(var(--ceo-ink-rgb))]"
          >
            <X size={14} />
          </button>
          <div className="flex items-center gap-3">
            <img src={profile.photo} alt="" className="h-11 w-11 rounded-full object-cover object-top" />
            <div>
              <p className="font-ceo-display text-sm font-bold text-[rgb(var(--ceo-ink-rgb))]">{profile.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-[rgb(var(--ceo-ink-muted-rgb))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--ceo-accent-rgb))]" aria-hidden="true" />
                Founder & CEO, Nexlifie
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ceo-ink-muted-rgb))]">{popup.message}</p>
          <button
            type="button"
            onClick={goToContact}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(var(--ceo-ink-rgb))] py-2.5 text-xs font-bold uppercase tracking-wide text-[rgb(var(--ceo-bg-rgb))] transition-colors hover:bg-[rgb(var(--ceo-accent-rgb))] hover:text-[rgb(var(--ceo-on-accent-rgb))]"
          >
            {popup.ctaLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
