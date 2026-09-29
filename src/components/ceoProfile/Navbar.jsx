import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../../data/ceoProfileContent';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Work' },
  { id: 'experience', label: 'Experience' },
];

const scrollToSection = (id) => (event) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-6"
    >
      <nav className="ceo-card flex w-full max-w-2xl items-center justify-between rounded-full px-2 py-2 sm:px-3">
        <button
          type="button"
          onClick={scrollToSection('hero')}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgb(var(--ceo-ink-rgb))] font-ceo-display text-sm font-bold text-[rgb(var(--ceo-bg-rgb))]"
          aria-label="Back to top"
        >
          MT
        </button>

        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={scrollToSection(link.id)}
                className="rounded-full px-3 py-2 text-sm font-medium text-[rgb(var(--ceo-ink-muted-rgb))] transition-colors duration-200 hover:bg-[rgb(var(--ceo-bg-alt-rgb))] hover:text-[rgb(var(--ceo-ink-rgb))] sm:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <Link
              to={profile.website}
              className="rounded-full px-4 py-2 text-sm font-medium text-[rgb(var(--ceo-ink-muted-rgb))] transition-colors duration-200 hover:bg-[rgb(var(--ceo-bg-alt-rgb))] hover:text-[rgb(var(--ceo-ink-rgb))]"
            >
              Website ↗
            </Link>
          </li>
        </ul>

        <a
          href="#contact"
          onClick={scrollToSection('contact')}
          className="hidden rounded-full bg-[rgb(var(--ceo-accent-rgb))] px-4 py-2 font-ceo-display text-xs font-bold uppercase tracking-wide text-[rgb(var(--ceo-on-accent-rgb))] transition-transform hover:scale-105 sm:block"
        >
          Connect
        </a>
      </nav>
    </motion.header>
  );
}
