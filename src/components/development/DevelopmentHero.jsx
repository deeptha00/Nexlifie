import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeUp, EASE } from '../../lib/motion';
import { Eyebrow, CTAButton, CTAGhost } from './parts';

/* The systems a business already runs — the inputs of the diagram — each
   mapped to the platform module it actually lands in once consolidated. */
const systems = [
  { label: 'CRM', module: 'Sales' },
  { label: 'HRMS', module: 'People' },
  { label: 'Sales', module: 'Sales' },
  { label: 'Inventory', module: 'Stock' },
  { label: 'Finance', module: 'Dash' },
  { label: 'Analytics', module: 'Dash' },
  { label: 'Website', module: 'Dash' },
  { label: 'Mobile App', module: 'Dash' },
  { label: 'AI', module: 'Dash' },
];

const MODULES = ['Dash', 'Sales', 'People', 'Stock'];

/* Nine feed lines, evenly spread, curving into one point. */
const FEED_LINES = systems.map((_, i) => 6 + i * 11);
const curveFor = (i) => `M ${FEED_LINES[i]} 0 C ${FEED_LINES[i]} 55, 50 45, 50 100`;

const FeedCurves = ({ active, reduce }) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="absolute inset-0 w-full h-full"
    aria-hidden="true"
  >
    {FEED_LINES.map((x, i) => (
      <motion.path
        key={x}
        d={curveFor(i)}
        fill="none"
        stroke="currentColor"
        strokeWidth={active === i ? 1.6 : 1}
        vectorEffect="non-scaling-stroke"
        className={`transition-colors duration-300 ${active === i ? 'text-green-600' : 'text-green-600/30'}`}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5 + i * 0.06, ease: 'easeOut' }}
      />
    ))}

    {/* the current flowing toward the platform, on whichever system is active */}
    <AnimatePresence>
      {!reduce && active !== null && (
        <motion.path
          key={`flow-${active}`}
          d={curveFor(active)}
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, strokeDashoffset: 0 }}
          animate={{
            opacity: 1,
            strokeDashoffset: [0, -16],
            transition: { opacity: { duration: 0.25 }, strokeDashoffset: { duration: 0.6, repeat: Infinity, ease: 'linear' } },
          }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        />
      )}
    </AnimatePresence>
  </svg>
);

const SystemTile = ({ label, i, active, onActivate, onDeactivate }) => (
  <motion.button
    type="button"
    onMouseEnter={() => onActivate(i)}
    onMouseLeave={onDeactivate}
    onFocus={() => onActivate(i)}
    onBlur={onDeactivate}
    onClick={() => onActivate(i)}
    aria-pressed={active}
    aria-label={`See how ${label} feeds into your platform`}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
    className={`text-left rounded-xl border px-2.5 py-3 md:px-3 md:py-3.5 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 ${
      active
        ? 'border-green-600/60 bg-green-600/[0.07]'
        : 'border-[rgb(var(--ink-rgb)/12%)] bg-[rgb(var(--ink-rgb)/2%)] hover:border-[rgb(var(--ink-rgb)/25%)]'
    }`}
  >
    {/* miniature interface glyph — every system has its own screen */}
    <div className="flex items-center gap-1 mb-2.5" aria-hidden="true">
      <span className={`w-1 h-1 rounded-full transition-colors duration-300 ${active ? 'bg-green-600' : 'bg-[rgb(var(--ink-rgb)/20%)]'}`} />
      <span className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${active ? 'bg-green-600/40' : 'bg-[rgb(var(--ink-rgb)/10%)]'}`} />
    </div>
    <p
      className={`text-[11px] md:text-xs font-semibold leading-none transition-colors duration-300 ${
        active ? 'text-green-700' : 'text-[rgb(var(--ink-rgb)/70%)]'
      }`}
    >
      {label}
    </p>
  </motion.button>
);

const ConvergenceDiagram = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Idle, the diagram cycles through each system on its own so the "many
     systems, one platform" idea reads even before anyone touches it. */
  useEffect(() => {
    if (paused || reduce) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % systems.length), 2600);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const activeModule = systems[active].module;

  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:max-w-none">
      {/* IN — the systems a business juggles today */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))]">YOUR SYSTEMS</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))]">09</span>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-2.5">
        {systems.map((s, i) => (
          <SystemTile
            key={s.label}
            label={s.label}
            i={i}
            active={active === i}
            onActivate={(idx) => {
              setActive(idx);
              setPaused(true);
            }}
            onDeactivate={() => setPaused(false)}
          />
        ))}
      </div>

      {/* CONVERGE */}
      <div className="relative h-24 md:h-28 text-green-600">
        <FeedCurves active={active} reduce={reduce} />
      </div>

      {/* OUT — one platform */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="rounded-2xl bg-[#111111] text-white p-5 md:p-6 shadow-[0_30px_60px_-28px_rgba(17,17,17,0.5)]"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/45">NEXLIFIE</span>
        </div>
        <p className="font-heading text-lg md:text-xl font-bold tracking-tight leading-snug mb-4">
          Custom Business Platform
        </p>
        <div className="grid grid-cols-4 gap-1.5 mb-4" aria-hidden="true">
          {MODULES.map((m) => {
            const isActive = m === activeModule;
            return (
              <div key={m} className="relative rounded-md py-2 text-center overflow-hidden">
                {isActive && (
                  <motion.span
                    layoutId="dev-hero-active-module"
                    className="absolute inset-0 rounded-md bg-green-500"
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                  />
                )}
                <span
                  className={`relative z-10 text-[9px] font-semibold transition-colors duration-300 ${
                    isActive ? 'text-[#0B0B0C]' : 'text-white/55'
                  }`}
                >
                  {m}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-3.5">
          <span className="font-mono text-[10px] text-white/40">ONE LOGIN</span>
          <span className="font-mono text-[10px] text-green-400">ONE SOURCE OF TRUTH</span>
        </div>
      </motion.div>
    </div>
  );
};

const DevelopmentHero = () => (
  <section className="relative bg-[var(--bg-dark)] overflow-hidden">
    <div className="relative mx-auto max-w-[1320px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.div {...fadeUp(0)}>
            <Eyebrow className="mb-7">NEXLIFIE / DEVELOPMENT</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-[38px] leading-[1.08] sm:text-[52px] sm:leading-[1.05] md:text-6xl md:leading-[1.04] font-bold tracking-tight text-[var(--secondary)] mb-7 text-balance"
          >
            Technology Built<br />
            <span className="text-[var(--primary)]">Around Your Business.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed max-w-lg mb-9"
          >
            From AI and custom business software to mobile apps, web applications, websites and
            games — we design and build digital products around the way you actually work.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-4 mb-10">
            <CTAButton to="/contact">Start a Project</CTAButton>
            <CTAGhost href="#capabilities">Explore What We Build</CTAGhost>
          </motion.div>

          <motion.p
            {...fadeUp(0.4)}
            className="font-mono text-[11px] tracking-[0.18em] text-[rgb(var(--muted-rgb))]"
          >
            STRATEGY • DESIGN • DEVELOPMENT • AI • CLOUD
          </motion.p>
        </div>

        {/* Many systems → one platform */}
        <div className="lg:col-span-6 xl:col-span-7">
          <ConvergenceDiagram />
        </div>
      </div>
    </div>
  </section>
);

export default DevelopmentHero;
