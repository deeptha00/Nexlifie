import { useEffect, useState } from 'react';
import { Boxes, Github, Globe, Layers, Linkedin, Mail, Menu, Rocket, User, X } from 'lucide-react';
import { profile } from '../../data/ctoProfileContent';

const HEADER = 64;

const links = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'architecture', label: 'Architecture', icon: Boxes },
  { id: 'nexlifie', label: 'Nexlifie', icon: Rocket },
  { id: 'craft', label: 'Craft', icon: Layers },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'GitHub', href: profile.github, icon: Github },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: `-${HEADER + 40}px 0px -55% 0px` }
    );
    ['top', ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open; Esc closes it
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      history.replaceState(null, '', id === 'top' ? window.location.pathname : `#${id}`);
    }, 0);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[rgb(var(--cto-base-rgb)/85%)] backdrop-blur border-b border-[rgb(var(--cto-line-rgb))]">
      <div className="cto-wrap h-16 flex items-center justify-between">
        <a href="#top" onClick={(e) => go(e, 'top')} className="flex items-baseline gap-3">
          <span className="font-semibold tracking-tight">{profile.name}</span>
          <span className="hidden sm:inline font-cto-mono text-[11px] text-[rgb(var(--cto-dim-rgb))]">
            / CTO, {profile.company}
          </span>
        </a>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {links.slice(0, -1).map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              aria-current={active === l.id ? 'true' : undefined}
              className={`relative font-cto-mono text-xs uppercase tracking-wider py-2 transition-colors ${
                active === l.id ? 'text-[rgb(var(--cto-fg-rgb))]' : 'text-[rgb(var(--cto-dim-rgb))] hover:text-[rgb(var(--cto-fg-rgb))]'
              }`}
            >
              {l.label}
              <span
                className={`absolute left-0 right-0 -bottom-px h-px bg-[rgb(var(--cto-accent-rgb))] transition-transform origin-left ${
                  active === l.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
          <span className="w-px h-5 bg-[rgb(var(--cto-line-rgb))]" />
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-[rgb(var(--cto-dim-rgb))] hover:text-[rgb(var(--cto-accent-rgb))] transition-colors"
            >
              <s.icon size={18} />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => go(e, 'contact')}
            className="font-cto-mono text-xs uppercase tracking-wider border border-[rgb(var(--cto-accent-rgb))] text-[rgb(var(--cto-accent-rgb))] px-3.5 py-2 hover:bg-[rgb(var(--cto-accent-rgb))] hover:text-[rgb(var(--cto-base-rgb))] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 -mr-2 text-[rgb(var(--cto-fg-rgb))]"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="cto-mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>

      {/* Mobile menu — a sibling of <header>, not nested inside it: nesting a
          `fixed` element inside another `fixed` element makes some browsers
          resolve its `top`/`bottom` auto-height against the header's own
          (much smaller) box instead of the viewport, collapsing it to ~0px. */}
      {open && (
        <div
          id="cto-mobile-menu"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-[rgb(var(--cto-base-rgb))] border-t border-[rgb(var(--cto-line-rgb))] overflow-y-auto"
        >
          <nav className="cto-wrap py-6" aria-label="Mobile">
            <ul className="divide-y divide-[rgb(var(--cto-line-rgb))] border-y border-[rgb(var(--cto-line-rgb))]">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    className={`flex items-center gap-4 py-4 text-lg ${
                      active === l.id ? 'text-[rgb(var(--cto-accent-rgb))]' : 'text-[rgb(var(--cto-fg-rgb))]'
                    }`}
                  >
                    <l.icon size={20} className={active === l.id ? 'text-[rgb(var(--cto-accent-rgb))]' : 'text-[rgb(var(--cto-dim-rgb))]'} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[rgb(var(--cto-line-rgb))] px-4 py-3 text-sm hover:border-[rgb(var(--cto-accent-rgb))] hover:text-[rgb(var(--cto-accent-rgb))] transition-colors"
                >
                  <s.icon size={18} /> {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
