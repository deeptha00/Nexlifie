import { ArrowUpRight, Cloud, ShieldCheck, Cpu, Workflow, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import SectionHeading from './Section';
import SpotlightCard from './SpotlightCard';
import CountUp from './CountUp';
import { profile, aboutPillars, marketingPillar, stats, audiences } from '../../data/ceoProfileContent';

const PILLAR_ICONS = { cloud: Cloud, shield: ShieldCheck, chip: Cpu, automation: Workflow, marketing: Megaphone };

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[rgb(var(--ceo-bg-alt-rgb)/50%)] py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[rgb(var(--ceo-accent-rgb)/10%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="About" title={<>Technology that<br />earns its keep.</>} />

        <div className="mt-10 grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-[rgb(var(--ceo-ink-rgb))] sm:text-xl">{profile.bio}</p>
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--ceo-ink-faint-rgb))]">Built for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {audiences.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-[rgb(var(--ceo-ink-rgb)/15%)] bg-[rgb(var(--ceo-surface-rgb))] px-4 py-1.5 text-sm font-semibold text-[rgb(var(--ceo-ink-rgb))]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to={profile.website}
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-[rgb(var(--ceo-accent-rgb))] pb-1 font-ceo-display text-sm font-bold uppercase tracking-wide text-[rgb(var(--ceo-ink-rgb))] transition-colors hover:text-[rgb(var(--ceo-accent-rgb))]"
            >
              Visit {profile.websiteLabel}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {[...aboutPillars, marketingPillar].map(({ key, label, blurb }, i) => {
              const Icon = PILLAR_ICONS[key];
              return (
                <Reveal key={key} delay={i * 0.08} className={i === 4 ? 'sm:col-span-2' : undefined}>
                  <SpotlightCard className="ceo-card h-full rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgb(var(--ceo-accent-rgb))] text-[rgb(var(--ceo-on-accent-rgb))]">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-ceo-display text-xl font-bold text-[rgb(var(--ceo-ink-rgb))]">{label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ceo-ink-muted-rgb))]">{blurb}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-[rgb(var(--ceo-ink-rgb)/10%)] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[rgb(var(--ceo-surface-rgb))] p-7 sm:p-9">
              <p className="font-ceo-display text-5xl font-black tracking-tight text-[rgb(var(--ceo-ink-rgb))] sm:text-6xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium leading-snug text-[rgb(var(--ceo-ink-muted-rgb))]">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
