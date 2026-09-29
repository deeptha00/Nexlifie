import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Plus } from 'lucide-react';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAButton, CTAGhost, CTAText } from '../development/parts';
import { featuredProject, projects } from '../../data/projects';

/**
 * The shared template for the six capability pages. Every page runs the same
 * sequence — hero, problem, what we build, in practice, process, what you get,
 * work, FAQ, the other capabilities, CTA — with its own content and its own
 * signature visual, so the six read as one family rather than one page repeated.
 */

const allProjects = [featuredProject, ...projects];

/** Headline built from lines, with one line carried in Nexlifie green. */
const HeroTitle = ({ lines, highlight }) => (
  <h1 className="font-heading text-[36px] leading-[1.08] sm:text-5xl sm:leading-[1.05] md:text-[56px] md:leading-[1.04] font-bold tracking-tight text-[var(--secondary)] text-balance">
    {lines.map((line, i) => (
      <span key={line} className={i === highlight ? 'text-[var(--primary)]' : undefined}>
        {line}
        {i < lines.length - 1 && <br />}
      </span>
    ))}
  </h1>
);

/* ── Hero ──────────────────────────────────────────────────────────── */

export const CapabilityHero = ({ capability, visual }) => (
  <section className="relative bg-[var(--bg-dark)] overflow-hidden">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10 pt-10 pb-20 md:pt-14 md:pb-28">
      <motion.div {...fadeUp(0)}>
        <Link
          to="/development"
          className="group inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[rgb(var(--muted-rgb))] hover:text-[var(--secondary)] transition-colors mb-10"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          NEXLIFIE / DEVELOPMENT
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16 items-center">
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.div {...fadeUp(0.05)}>
            <Eyebrow className="mb-7">{capability.eyebrow}</Eyebrow>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="mb-7">
            <HeroTitle lines={capability.hero.lines} highlight={capability.hero.highlight} />
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed max-w-lg mb-9"
          >
            {capability.hero.lead}
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-4 mb-10">
            <CTAButton to="/contact">{capability.hero.cta}</CTAButton>
            <CTAGhost href="#what-we-build">What We Build</CTAGhost>
          </motion.div>

          <motion.p
            {...fadeUp(0.4)}
            className="font-mono text-[11px] tracking-[0.18em] text-[rgb(var(--muted-rgb))]"
          >
            {capability.hero.strip.toUpperCase()}
          </motion.p>
        </div>

        <motion.div {...fadeUpScale(0.15)} className="lg:col-span-6 xl:col-span-7 w-full">
          {visual}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── The problem ───────────────────────────────────────────────────── */

export const CapabilityProblem = ({ capability }) => (
  <section className="bg-[#111111] text-white py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div {...fadeUp(0)} className="lg:col-span-4">
          <Eyebrow tone="dark" className="mb-7">THE PROBLEM</Eyebrow>
          <SectionTitle tone="dark">{capability.problem.title}</SectionTitle>
        </motion.div>

        <div className="lg:col-span-8">
          <motion.div {...staggerParent(0.1)} className="flex flex-col">
            {capability.problem.pains.map((p, i) => (
              <motion.div
                key={p.pain}
                variants={staggerItem}
                className="border-t border-white/10 py-6 md:py-7 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-white/30 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-lg md:text-xl font-semibold text-white/90 mb-2 leading-snug">{p.pain}</p>
                    <p className="text-sm md:text-[15px] text-white/50 leading-relaxed max-w-xl">{p.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="mt-10 pt-8 border-t border-white/10">
            <p className="font-heading text-xl sm:text-2xl md:text-[30px] leading-[1.2] font-bold tracking-tight text-green-400 text-balance">
              {capability.problem.turn}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

/* ── What we build ─────────────────────────────────────────────────── */

export const CapabilityBuild = ({ capability }) => (
  <section id="what-we-build" className="bg-[var(--bg-dark)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <Eyebrow className="mb-6">WHAT WE BUILD</Eyebrow>
        <SectionTitle className="mb-6">{capability.build.title}</SectionTitle>
        <SectionLead className="max-w-xl">{capability.build.lead}</SectionLead>
      </motion.div>

      <motion.div
        {...staggerParent(0.08)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-[rgb(var(--ink-rgb)/10%)] pt-10"
      >
        {capability.build.groups.map((g, i) => (
          <motion.div key={g.group} variants={staggerItem}>
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-mono text-[10px] text-green-600">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--secondary)]">{g.group}</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 text-sm text-[rgb(var(--ink-rgb)/70%)] font-medium"
                >
                  <span className="w-2.5 h-[1px] bg-green-600 shrink-0 translate-y-[-4px]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── In practice ───────────────────────────────────────────────────── */

export const CapabilityScenario = ({ capability, visual }) => (
  <section className="bg-[rgb(var(--ink-rgb)/2.5%)] border-y border-[rgb(var(--ink-rgb)/8%)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div {...fadeUp(0)} className="lg:col-span-5">
          <Eyebrow className="mb-6">{capability.scenario.eyebrow}</Eyebrow>
          <SectionTitle className="mb-8">{capability.scenario.title}</SectionTitle>
          <p className="font-heading text-lg md:text-xl font-semibold tracking-tight text-[var(--primary)] text-balance">
            {capability.scenario.close}
          </p>
        </motion.div>

        <motion.ol {...staggerParent(0.1)} className="lg:col-span-7">
          {capability.scenario.steps.map((step, i) => (
            <motion.li
              key={step}
              variants={staggerItem}
              className="flex gap-4 md:gap-5 border-t border-[rgb(var(--ink-rgb)/10%)] py-5 md:py-6 first:border-t-0 first:pt-0"
            >
              <span className="w-7 h-7 rounded-full bg-green-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-base md:text-lg text-[rgb(var(--ink-rgb)/75%)] leading-relaxed">{step}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      {visual && (
        <motion.div {...fadeUpScale(0.1)} className="mt-14 md:mt-20">
          {visual}
        </motion.div>
      )}
    </div>
  </section>
);

/* ── Process ───────────────────────────────────────────────────────── */

export const CapabilityProcess = ({ capability }) => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <Eyebrow className="mb-6">HOW WE BUILD IT</Eyebrow>
        <SectionTitle>From business problem to working product.</SectionTitle>
      </motion.div>

      <motion.div {...staggerParent(0.1)} className="hidden md:grid grid-cols-5 relative">
        <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[rgb(var(--ink-rgb)/15%)]" aria-hidden="true" />
        {capability.process.map((step) => (
          <motion.div key={step.index} variants={staggerItem} className="relative pr-6 lg:pr-10 last:pr-0">
            <span
              className="block w-[11px] h-[11px] rounded-full bg-green-600 mb-6 relative z-10 ring-4 ring-[var(--bg-dark)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-[rgb(var(--muted-rgb))] tracking-widest">{step.index}</span>
            <h3 className="font-heading text-base lg:text-xl font-bold tracking-tight text-[var(--secondary)] mt-2 mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div {...staggerParent(0.08)} className="md:hidden flex flex-col">
        {capability.process.map((step) => (
          <motion.div
            key={step.index}
            variants={staggerItem}
            className="border-t border-[rgb(var(--ink-rgb)/12%)] py-6 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-xs text-green-600 tracking-widest">{step.index}</span>
              <h3 className="font-heading text-xl font-bold tracking-tight text-[var(--secondary)]">{step.title}</h3>
            </div>
            <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ── What you get ──────────────────────────────────────────────────── */

export const CapabilityDeliverables = ({ capability }) => (
  <section className="bg-[var(--bg-dark)] border-t border-[rgb(var(--ink-rgb)/8%)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div {...fadeUp(0)} className="lg:col-span-4">
          <Eyebrow className="mb-6">WHAT YOU GET</Eyebrow>
          <SectionTitle className="mb-6">Handed over, not held hostage.</SectionTitle>
          <SectionLead>Every engagement ends with you owning what we built.</SectionLead>
        </motion.div>

        <motion.ul {...staggerParent(0.08)} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {capability.deliverables.map((d) => (
            <motion.li
              key={d}
              variants={staggerItem}
              className="flex items-start gap-3.5 rounded-2xl border border-[rgb(var(--ink-rgb)/10%)] bg-[rgb(var(--ink-rgb)/1.5%)] p-5"
            >
              <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} className="text-white" strokeWidth={3} />
              </span>
              <span className="text-sm md:text-[15px] font-medium text-[rgb(var(--ink-rgb)/80%)] leading-relaxed">
                {d}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  </section>
);

/* ── Selected work ─────────────────────────────────────────────────── */

export const CapabilityWork = ({ capability }) => {
  const shown = capability.work
    .map((name) => allProjects.find((p) => p.name === name))
    .filter(Boolean);

  if (!shown.length) return null;

  return (
    <section className="bg-[var(--bg-dark)] border-t border-[rgb(var(--ink-rgb)/8%)] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <Eyebrow className="mb-6">SELECTED WORK</Eyebrow>
            <SectionTitle>Built. Shipped. In the real world.</SectionTitle>
          </div>
          <CTAText to="/clients">See All Work</CTAText>
        </motion.div>

        <motion.div
          {...staggerParent(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8"
        >
          {shown.map((project) => (
            <motion.article key={project.name} variants={staggerItem} className="group">
              <div className="rounded-2xl overflow-hidden bg-white border border-[#111111]/12 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#111111]/8 bg-[#FBFBFA]" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
                  <div className="ml-3 h-5 w-1/3 rounded-md bg-[#111111]/[0.05]" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]/5">
                  <img
                    src={project.images[0]}
                    alt={`${project.name} — ${project.category} project built by Nexlifie`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="pt-5 px-1">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--secondary)]">
                    {project.name}
                  </h3>
                  <span className="text-xs font-medium text-[rgb(var(--muted-rgb))] shrink-0">
                    {project.category}
                  </span>
                </div>
                <p className="text-[13px] text-[rgb(var(--muted-rgb))] leading-relaxed">{project.build}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── FAQ ───────────────────────────────────────────────────────────── */

export const CapabilityFAQ = ({ capability }) => (
  <section className="bg-[rgb(var(--ink-rgb)/2.5%)] border-y border-[rgb(var(--ink-rgb)/8%)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div {...fadeUp(0)} className="lg:col-span-4">
          <Eyebrow className="mb-6">QUESTIONS</Eyebrow>
          <SectionTitle>The things people ask us first.</SectionTitle>
        </motion.div>

        {/* Native <details> so the answers are readable without JavaScript
            and land in the prerendered HTML for search engines. */}
        <div className="lg:col-span-8">
          {capability.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-t border-[rgb(var(--ink-rgb)/12%)] last:border-b last:border-[rgb(var(--ink-rgb)/12%)]"
            >
              <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-lg">
                <span className="font-heading text-lg md:text-xl font-bold tracking-tight text-[var(--secondary)] group-open:text-green-700 transition-colors">
                  {faq.q}
                </span>
                <Plus
                  size={18}
                  className="shrink-0 mt-1 text-[rgb(var(--ink-rgb)/35%)] group-open:rotate-45 group-open:text-green-600 transition-transform duration-300"
                />
              </summary>
              <p className="text-sm md:text-[15px] text-[rgb(var(--muted-rgb))] leading-relaxed pb-6 max-w-2xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── The other capabilities ────────────────────────────────────────── */

export const CapabilityNext = ({ capability, all }) => {
  const others = all.filter((c) => c.slug !== capability.slug);

  return (
    <section className="bg-[var(--bg-dark)] py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-12 md:mb-14">
          <Eyebrow className="mb-6">ALSO FROM NEXLIFIE</Eyebrow>
          <SectionTitle>One partner for the whole stack.</SectionTitle>
        </motion.div>

        <motion.div {...staggerParent(0.06)}>
          {others.map((c) => (
            <motion.div key={c.slug} variants={staggerItem}>
              <Link
                to={`/services/${c.slug}`}
                className="group flex items-center gap-5 border-t border-[rgb(var(--ink-rgb)/10%)] last:border-b last:border-[rgb(var(--ink-rgb)/10%)] py-6 md:py-7 hover:bg-[rgb(var(--ink-rgb)/2%)] transition-colors duration-300"
              >
                <span className="font-mono text-[11px] text-[rgb(var(--muted-rgb))] shrink-0">{c.number}</span>
                <h3 className="font-heading text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight text-[var(--secondary)] group-hover:text-green-700 transition-colors">
                  {c.name}
                </h3>
                <ArrowUpRight
                  size={20}
                  className="ml-auto shrink-0 text-[rgb(var(--ink-rgb)/25%)] group-hover:text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ── Closing CTA ───────────────────────────────────────────────────── */

export const CapabilityCTA = ({ capability }) => (
  <section className="bg-[#111111] text-[#F7F8F6] pt-20 pb-20 md:pt-28 md:pb-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0, 30)} className="max-w-3xl">
        <h2 className="font-heading text-[34px] leading-[1.08] sm:text-5xl sm:leading-[1.06] md:text-[56px] md:leading-[1.04] font-bold tracking-tight mb-7 text-balance">
          {capability.cta.lines[0]}<br />
          <span className="text-green-400">{capability.cta.lines[1]}</span>
        </h2>
        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-10">{capability.cta.lead}</p>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CTAButton to="/contact" tone="green">{capability.cta.button}</CTAButton>
          <CTAGhost to="/contact" tone="dark">Talk to a Nexlifie Expert</CTAGhost>
        </div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-white/35">
          WEBSITES • APPS • CUSTOM SOFTWARE • AI • GAMES
        </p>
      </motion.div>
    </div>
  </section>
);
