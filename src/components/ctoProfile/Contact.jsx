import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { profile } from '../../data/ctoProfileContent';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const channels = [
    {
      icon: Linkedin, label: 'LinkedIn', value: 'deeptha-a-b9891323a',
      href: profile.linkedin, external: true,
    },
    {
      icon: Mail, label: 'Email', value: profile.email,
      href: `mailto:${profile.email}`,
      action: (
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="flex items-center gap-1.5 font-cto-mono text-[11px] uppercase tracking-wider border border-[rgb(var(--cto-line-rgb))] px-2.5 py-1.5 text-[rgb(var(--cto-dim-rgb))] hover:border-[rgb(var(--cto-accent-rgb))] hover:text-[rgb(var(--cto-accent-rgb))] transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Copied' : 'Copy'}
        </button>
      ),
    },
    {
      icon: Github, label: 'GitHub', value: 'deeptha00',
      href: profile.github, external: true,
    },
    {
      icon: Globe, label: `${profile.company} website`, value: profile.websiteLabel,
      href: profile.website, external: false,
    },
  ];

  return (
    <section id="contact" className="border-t border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb)/40%)] scroll-mt-16">
      <div className="cto-wrap py-24 md:py-32">
        <Reveal>
          <p className="cto-kicker">06 / Contact</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-8 overflow-hidden border border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-base-rgb))]">
            <div className="cto-grid-bg absolute inset-0 pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[rgb(var(--cto-accent-rgb)/8%)] blur-[110px] pointer-events-none" />

            <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
              {/* Primary action */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-12 lg:border-r border-[rgb(var(--cto-line-rgb))]">
                <div>
                  <h2 className="text-4xl md:text-6xl leading-[1.02] font-bold">
                    Let's talk about what you're building.
                  </h2>
                  <p className="mt-6 max-w-md text-lg text-[rgb(var(--cto-dim-rgb))] leading-relaxed">
                    The best way to reach me is on LinkedIn. Send a connection request with a short note about your idea.
                  </p>
                </div>
                <div>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-[rgb(var(--cto-accent-rgb))] text-[rgb(var(--cto-base-rgb))] font-medium px-7 py-4 hover:brightness-110 transition"
                  >
                    <Linkedin size={20} />
                    Connect on LinkedIn
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-4 flex items-center gap-2 font-cto-mono text-[11px] uppercase tracking-wider text-[rgb(var(--cto-dim-rgb))]">
                    <MapPin size={13} className="text-[rgb(var(--cto-accent-rgb))]" /> {profile.location} · IST
                  </p>
                </div>
              </div>

              {/* Channels */}
              <div className="flex flex-col border-t lg:border-t-0 border-[rgb(var(--cto-line-rgb))] divide-y divide-[rgb(var(--cto-line-rgb))]">
                <p className="px-8 md:px-12 lg:px-10 py-4 font-cto-mono text-[11px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">
                  Other ways to reach me
                </p>
                {channels.map((c) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[rgb(var(--cto-line-rgb))] text-[rgb(var(--cto-accent-rgb))] group-hover:border-[rgb(var(--cto-accent-rgb))] transition-colors">
                        <c.icon size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-cto-mono text-[10px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">{c.label}</span>
                        <span className="mt-1 block truncate text-[rgb(var(--cto-fg-rgb))] group-hover:text-[rgb(var(--cto-accent-rgb))] transition-colors">{c.value}</span>
                      </span>
                      {c.action || <ArrowUpRight size={18} className="text-[rgb(var(--cto-dim-rgb))] group-hover:text-[rgb(var(--cto-accent-rgb))] transition-colors" />}
                    </>
                  );
                  const className = 'group flex flex-1 items-center gap-5 px-8 md:px-12 lg:px-10 py-6 hover:bg-[rgb(var(--cto-surface-rgb))] transition-colors';
                  return c.external ? (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link key={c.label} to={c.href} className={className}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
