import Reveal from './Reveal';

/** Shared eyebrow + headline block so every section heads up the same way. */
export default function SectionHeading({ eyebrow, title, dark = false, center = false }) {
  return (
    <Reveal className={center ? 'text-center' : undefined}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] ${
          dark ? 'text-[rgb(var(--ceo-accent-rgb))]' : 'text-[rgb(var(--ceo-accent-ink-rgb))]'
        }`}
      >
        <span className={`h-px w-8 ${dark ? 'bg-[rgb(var(--ceo-accent-rgb))]' : 'bg-[rgb(var(--ceo-accent-ink-rgb))]'}`} />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-ceo-display text-4xl font-black leading-[1.02] tracking-tight text-[rgb(var(--ceo-ink-rgb))] sm:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}
