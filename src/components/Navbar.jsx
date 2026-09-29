import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import capabilities from '../data/capabilities';

/* The six capability pages, surfaced as a dropdown under Development so a
   visitor can jump straight to the one they came for. */
const developmentLinks = capabilities.map((c) => ({
  name: c.name,
  to: `/services/${c.slug}`,
  number: c.number,
}));

const navLinks = [
  { name: 'Development', to: '/development', children: developmentLinks },
  { name: 'Media', to: '/media' },
  { name: 'About', to: '/about' },
  { name: 'Clients / Work', to: '/clients' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDevOpen, setMobileDevOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-[100] bg-[var(--header-bg)] backdrop-blur-md border-b border-[rgb(var(--ink-rgb)/10%)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center shrink-0">
          <img src={theme === 'dark' ? logoDark : logoLight} alt="Nexlifie" className="h-9 sm:h-10 w-auto scale-[2.4] md:scale-[2.9] origin-left" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.children ?? []).some((c) => location.pathname === c.to);
            return (
              <div key={link.name} className="relative group">
                <Link
                  to={link.to}
                  className="relative flex items-center gap-1 py-2 text-[13px] font-medium tracking-wide text-[rgb(var(--ink-rgb)/70%)] hover:text-[rgb(var(--ink-rgb))] transition-colors"
                >
                  {link.name}
                  {link.children && (
                    <ChevronDown
                      size={13}
                      className="transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="global-nav-dot"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-green-600"
                    />
                  )}
                </Link>

                {link.children && (
                  <div
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible -translate-y-1 pointer-events-none
                      transition-[opacity,transform,visibility] duration-200 ease-out
                      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto
                      focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 focus-within:pointer-events-auto"
                  >
                    <div className="w-72 rounded-2xl border border-[rgb(var(--ink-rgb)/10%)] bg-[var(--header-bg)] backdrop-blur-md shadow-[var(--shadow-soft)] p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-[rgb(var(--ink-rgb)/6%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                        >
                          <span className="font-mono text-[10px] text-green-600 shrink-0">{child.number}</span>
                          <span className="text-[13px] font-medium text-[rgb(var(--ink-rgb)/80%)]">{child.name}</span>
                        </Link>
                      ))}
                      <div className="my-1 border-t border-[rgb(var(--ink-rgb)/8%)]" />
                      <Link
                        to={link.to}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-semibold text-green-600 hover:bg-green-600/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                      >
                        Development Overview
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <ThemeToggle className="hidden sm:flex !border-[rgb(var(--ink-rgb)/15%)] !bg-[rgb(var(--ink-rgb)/5%)]" />
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-[rgb(var(--ink-rgb))] text-[var(--bg-dark)] text-[13px] font-semibold tracking-wide px-5 py-2.5 rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-transform group"
          >
            Let's Talk
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            className="lg:hidden text-[rgb(var(--ink-rgb))] p-1.5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-[rgb(var(--ink-rgb)/10%)] bg-[var(--bg-dark)]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.to ||
                  (link.children ?? []).some((c) => location.pathname === c.to);
                return (
                  <div key={link.name} className="border-b border-[rgb(var(--ink-rgb)/8%)] last:border-b-0">
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`flex-1 py-3 text-2xl font-semibold tracking-tight ${
                          isActive ? 'text-green-600' : 'text-[rgb(var(--ink-rgb))]'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {link.children && (
                        <button
                          type="button"
                          onClick={() => setMobileDevOpen((v) => !v)}
                          aria-expanded={mobileDevOpen}
                          aria-label={`${mobileDevOpen ? 'Hide' : 'Show'} ${link.name} pages`}
                          className="p-3 -mr-3 text-[rgb(var(--ink-rgb)/50%)]"
                        >
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-200 ${mobileDevOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {link.children && (
                      <AnimatePresence initial={false}>
                        {mobileDevOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-3 flex flex-col gap-0.5">
                              {link.children.map((child) => (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  onClick={() => setOpen(false)}
                                  className={`flex items-center gap-3 py-2.5 text-[15px] font-medium ${
                                    location.pathname === child.to
                                      ? 'text-green-600'
                                      : 'text-[rgb(var(--ink-rgb)/65%)]'
                                  }`}
                                >
                                  <span className="font-mono text-[10px] text-green-600/70 shrink-0">
                                    {child.number}
                                  </span>
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex items-center justify-center gap-2 bg-[rgb(var(--ink-rgb))] text-[var(--bg-dark)] text-sm font-semibold px-6 py-4 rounded-2xl"
              >
                Let's Talk <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
