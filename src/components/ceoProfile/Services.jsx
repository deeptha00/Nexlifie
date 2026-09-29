import { Globe, Code2, Search, Workflow, Server, Megaphone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionHeading from './Section';
import SpotlightCard from './SpotlightCard';
import { services, profile } from '../../data/ceoProfileContent';

const ICONS = [Globe, Code2, Search, Workflow, Server, Megaphone];
// Bento layout: first and last cards span wider on desktop.
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-6'];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-black/55 py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-[rgb(var(--ceo-accent-rgb)/10%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--ceo-bg-rgb)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ceo-bg-rgb)) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading dark eyebrow="What Nexlifie builds" title={<>Six ways we turn<br />ideas into growth.</>} />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={service.number} delay={i * 0.07} className={SPANS[i] ?? 'lg:col-span-2'}>
                <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-colors duration-300 hover:border-[rgb(var(--ceo-accent-rgb)/50%)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(var(--ceo-accent-rgb))] text-[rgb(var(--ceo-on-accent-rgb))]">
                      <Icon size={22} />
                    </div>
                    {service.tag ? (
                      <span className="rounded-full border border-[rgb(var(--ceo-accent-rgb)/40%)] bg-[rgb(var(--ceo-accent-rgb)/10%)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[rgb(var(--ceo-accent-rgb))]">
                        {service.tag}
                      </span>
                    ) : (
                      <span className="font-ceo-display text-sm font-bold tracking-widest text-white/30">
                        {service.number}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 flex items-center gap-2 font-ceo-display text-2xl font-bold text-[rgb(var(--ceo-ink-rgb))] sm:text-3xl">
                    {service.title}
                    <ArrowUpRight
                      size={22}
                      className="text-[rgb(var(--ceo-accent-rgb))] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                    {service.description}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            to={profile.website}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-ceo-display text-sm font-bold tracking-wide text-[rgb(var(--ceo-ink-rgb))] transition-colors hover:border-[rgb(var(--ceo-accent-rgb))] hover:text-[rgb(var(--ceo-accent-rgb))]"
          >
            Explore everything at {profile.websiteLabel}
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
