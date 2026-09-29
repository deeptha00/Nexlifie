import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MotionLink = motion.create(Link);

/* ── Section furniture ─────────────────────────────────────────────── */

/** Small mono eyebrow with a leading rule. `tone="dark"` for ink panels. */
export const Eyebrow = ({ children, tone = 'light', className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <span className={`w-6 h-[1px] ${tone === 'dark' ? 'bg-green-500' : 'bg-green-600'}`} />
    <span
      className={`text-[11px] font-mono tracking-[0.3em] ${
        tone === 'dark' ? 'text-white/45' : 'text-[rgb(var(--muted-rgb))]'
      }`}
    >
      {children}
    </span>
  </div>
);

/** Editorial section headline. */
export const SectionTitle = ({ children, className = '', tone = 'light' }) => (
  <h2
    className={`font-heading text-[32px] leading-[1.12] sm:text-5xl sm:leading-[1.08] md:text-[52px] md:leading-[1.06] font-bold tracking-tight text-balance ${
      tone === 'dark' ? 'text-white' : 'text-[var(--secondary)]'
    } ${className}`}
  >
    {children}
  </h2>
);

export const SectionLead = ({ children, className = '', tone = 'light' }) => (
  <p
    className={`text-base md:text-lg leading-relaxed ${
      tone === 'dark' ? 'text-white/55' : 'text-[rgb(var(--muted-rgb))]'
    } ${className}`}
  >
    {children}
  </p>
);

/* ── Calls to action ───────────────────────────────────────────────── */

/**
 * Solid primary button. Inverts with the theme (ink on off-white, off-white on
 * near-black) so it never sinks into the page background.
 * `tone="green"` for fixed dark panels, `tone="invert"` on ink surfaces.
 */
export const CTAButton = ({ to = '/contact', children, tone = 'ink', className = '' }) => {
  const tones = {
    ink: 'bg-[rgb(var(--ink-rgb))] text-[var(--bg-dark)] hover:opacity-90',
    green: 'bg-green-500 text-[#0B0B0C] hover:bg-green-400',
    invert: 'bg-white text-[#111111] hover:bg-white/90',
  };
  return (
    <MotionLink
      to={to}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2 text-sm font-semibold px-7 py-4 rounded-2xl transition-colors ${tones[tone]} ${className}`}
    >
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </MotionLink>
  );
};

/** Outlined secondary button. Accepts an anchor href for in-page jumps. */
export const CTAGhost = ({ to, href, children, tone = 'light', className = '' }) => {
  const cls =
    tone === 'dark'
      ? 'border-white/25 text-white hover:border-white/60'
      : 'border-[rgb(var(--ink-rgb)/20%)] text-[var(--secondary)] hover:border-[rgb(var(--ink-rgb)/50%)]';
  const base = `inline-flex items-center gap-2 border text-sm font-semibold px-7 py-4 rounded-2xl transition-colors ${cls} ${className}`;
  return href ? (
    <a href={href} className={base}>
      {children}
    </a>
  ) : (
    <Link to={to} className={base}>
      {children}
    </Link>
  );
};

/** Understated underlined text CTA — used to close most sections. */
export const CTAText = ({ to = '/contact', children, tone = 'light', className = '' }) => (
  <Link
    to={to}
    className={`group inline-flex items-center gap-2 text-sm font-semibold border-b pb-1 transition-colors ${
      tone === 'dark'
        ? 'text-white border-white/30 hover:border-green-500 hover:text-green-400'
        : 'text-[var(--secondary)] border-[rgb(var(--ink-rgb)/30%)] hover:border-green-600 hover:text-green-700'
    } ${className}`}
  >
    {children}
    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
  </Link>
);

/* ── Interface mockup shells ───────────────────────────────────────── */

/**
 * Browser window shell. The interior is deliberately light in both themes —
 * a screenshot of a product reads as a screenshot, not as page chrome.
 */
export const BrowserFrame = ({ children, label, className = '', bodyClass = 'bg-white' }) => (
  <div
    className={`rounded-2xl border border-[#111111]/[0.14] bg-white overflow-hidden shadow-[var(--shadow-soft)] ${className}`}
  >
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#111111]/8 bg-[#FBFBFA]">
      <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
      <div className="ml-3 flex-1 max-w-[220px] h-5 rounded-md bg-[#111111]/[0.05] flex items-center px-2.5">
        {label && <span className="font-mono text-[9px] text-[#111111]/40 truncate">{label}</span>}
      </div>
    </div>
    <div className={bodyClass}>{children}</div>
  </div>
);

/** Phone shell with a hardware bezel. */
export const PhoneFrame = ({ children, className = '' }) => (
  <div
    className={`rounded-[2rem] border-[6px] border-[#141414] bg-[#141414] overflow-hidden shadow-[0_30px_60px_-24px_rgba(17,17,17,0.45)] ${className}`}
  >
    <div className="relative rounded-[1.6rem] overflow-hidden bg-white">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-[#141414]/85 z-20" />
      {children}
    </div>
  </div>
);
