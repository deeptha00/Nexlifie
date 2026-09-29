import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { profile } from '../../data/ctoProfileContent';

const up = (d = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const facts = [
  ['Role', 'CTO & Co-Founder'],
  ['Company', profile.company],
  ['Location', profile.location],
  ['Focus', 'Web · Mobile · AI · Cloud'],
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16 scroll-mt-16">
      <div className="cto-grid-bg absolute inset-0 pointer-events-none" />
      <div className="absolute -top-32 left-[-10%] w-[640px] h-[640px] rounded-full bg-[rgb(var(--cto-accent-rgb)/7%)] blur-[120px] pointer-events-none" />

      <div className="cto-wrap relative grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center py-16 md:py-24 lg:min-h-[calc(100vh-4rem)]">
        <div>
          <motion.p {...up(0.05)} className="cto-kicker">CTO &amp; Co-Founder — {profile.company}</motion.p>
          <motion.h1 {...up(0.15)} className="mt-6 text-5xl sm:text-7xl lg:text-[6.5rem] leading-[0.98] font-bold">
            Deeptha A
          </motion.h1>
          <motion.p {...up(0.28)} className="mt-6 text-2xl md:text-3xl font-medium text-[rgb(var(--cto-fg-rgb)/90%)] tracking-tight">
            I build ideas into technology.
          </motion.p>
          <motion.p {...up(0.38)} className="mt-6 max-w-xl text-[rgb(var(--cto-dim-rgb))] text-lg leading-relaxed">
            Software Developer and Co-Founder of {profile.company}. I turn ideas into real digital products across web, mobile, AI, gaming and cloud, and I own the engineering from architecture to production.
          </motion.p>
          <motion.div {...up(0.48)} className="mt-9 flex flex-wrap gap-3">
            <a href="#architecture" className="cto-btn bg-[rgb(var(--cto-accent-rgb))] text-[rgb(var(--cto-base-rgb))] hover:brightness-110">
              Explore the architecture →
            </a>
            <a
              href="#contact"
              className="cto-btn border border-[rgb(var(--cto-line-rgb))] text-[rgb(var(--cto-fg-rgb))] hover:border-[rgb(var(--cto-accent-rgb))] hover:text-[rgb(var(--cto-accent-rgb))]"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.dl
            {...up(0.6)}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 border border-[rgb(var(--cto-line-rgb))] divide-x divide-y sm:divide-y-0 divide-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb)/60%)]"
          >
            {facts.map(([k, v]) => (
              <div key={k} className="p-4">
                <dt className="font-cto-mono text-[10px] uppercase tracking-[0.14em] text-[rgb(var(--cto-dim-rgb))]">{k}</dt>
                <dd className="mt-1.5 text-sm font-medium">
                  {k === 'Company' ? (
                    <Link
                      to={profile.website}
                      className="hover:text-[rgb(var(--cto-accent-rgb))] transition-colors underline underline-offset-4 decoration-[rgb(var(--cto-line-rgb))] hover:decoration-[rgb(var(--cto-accent-rgb))]"
                    >
                      {v} ↗
                    </Link>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] border border-[rgb(var(--cto-line-rgb))] bg-[rgb(var(--cto-surface-rgb))] overflow-hidden">
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.title} at ${profile.company}`}
              className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--cto-base-rgb)/80%)] via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-semibold text-lg leading-tight">{profile.name}</p>
                <p className="text-sm text-[rgb(var(--cto-fg-rgb)/70%)]">{profile.title}, {profile.company}</p>
              </div>
              <span className="hidden sm:flex items-center gap-2 font-cto-mono text-[11px] text-[rgb(var(--cto-accent-rgb))]">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--cto-accent-rgb))] animate-pulse" />Building
              </span>
            </div>
          </div>
          {['-top-2 -left-2 border-t border-l', '-top-2 -right-2 border-t border-r', '-bottom-2 -left-2 border-b border-l', '-bottom-2 -right-2 border-b border-r'].map((c) => (
            <span key={c} className={`absolute w-4 h-4 border-[rgb(var(--cto-accent-rgb))] ${c}`} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
