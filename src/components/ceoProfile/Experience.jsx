import { GraduationCap, TrendingUp } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './Section';
import { experience, education } from '../../data/ceoProfileContent';

// Data is newest-first; the path reads bottom-up as a climb.
const steps = [...experience].reverse();

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Experience" title={<>Every role<br />levelled me up.</>} />
          <Reveal
            delay={0.1}
            className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--ceo-ink-rgb)/10%)] bg-[rgb(var(--ceo-surface-rgb))] p-4 pr-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--ceo-accent-rgb)/12%)] text-[rgb(var(--ceo-accent-ink-rgb))]">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="font-ceo-display text-sm font-bold text-[rgb(var(--ceo-ink-rgb))]">{education.degree}</p>
              <p className="text-xs text-[rgb(var(--ceo-ink-muted-rgb))]">{education.institution}</p>
            </div>
          </Reveal>
        </div>

        {/* Staircase: each step sits higher than the last on desktop */}
        <ol className="mt-10 grid gap-4 md:grid-cols-4 md:items-end">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            const lift = ['md:mt-20', 'md:mt-14', 'md:mt-7', 'md:mt-0'][i] ?? '';
            return (
              <li key={step.role} className={lift}>
                <Reveal delay={i * 0.1} className="h-full">
                  <div
                    className={`group relative flex h-full min-h-[15rem] flex-col justify-between rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-2 md:min-h-[17rem] ${
                      last
                        ? 'border border-[rgb(var(--ceo-accent-rgb)/40%)] bg-[rgb(var(--ceo-accent-rgb)/12%)]'
                        : 'ceo-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-ceo-display text-xs font-bold tracking-widest ${
                          last ? 'text-[rgb(var(--ceo-accent-rgb))]' : 'text-[rgb(var(--ceo-accent-ink-rgb))]'
                        }`}
                      >
                        LEVEL 0{i + 1}
                      </span>
                      {last ? (
                        <span className="rounded-full bg-[rgb(var(--ceo-accent-rgb))] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--ceo-on-accent-rgb))]">
                          Now
                        </span>
                      ) : (
                        <TrendingUp
                          size={16}
                          className="text-[rgb(var(--ceo-ink-faint-rgb))] transition-colors group-hover:text-[rgb(var(--ceo-accent-ink-rgb))]"
                        />
                      )}
                    </div>
                    <div className="mt-6">
                      <h3 className="font-ceo-display text-2xl font-bold leading-tight">{step.role}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ceo-ink-muted-rgb))]">{step.focus}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
