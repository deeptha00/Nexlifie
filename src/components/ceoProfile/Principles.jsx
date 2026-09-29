import Reveal from './Reveal';
import { principles } from '../../data/ceoProfileContent';

export default function Principles() {
  return (
    <section aria-label="Operating principles" className="pb-14 pt-10 sm:pb-16 sm:pt-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <blockquote className="mx-auto mb-10 max-w-4xl text-center">
            <p className="font-ceo-display text-3xl font-black leading-tight tracking-tight text-[rgb(var(--ceo-ink-rgb))] sm:text-5xl">
              &ldquo;Ideas are easy.
              <br />
              <span className="text-[rgb(var(--ceo-accent-ink-rgb))]">Building them is the work.</span>&rdquo;
            </p>
            <footer className="mt-5 text-sm font-semibold uppercase tracking-widest text-[rgb(var(--ceo-ink-faint-rgb))]">
              Muhammad Mubashir T
            </footer>
          </blockquote>
        </Reveal>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="ceo-card h-full rounded-3xl border-t-2 border-t-[rgb(var(--ceo-accent-rgb))] p-7">
              <span className="font-ceo-display text-xs font-bold tracking-widest text-[rgb(var(--ceo-accent-ink-rgb))]">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-ceo-display text-xl font-bold text-[rgb(var(--ceo-ink-rgb))]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ceo-ink-muted-rgb))]">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
