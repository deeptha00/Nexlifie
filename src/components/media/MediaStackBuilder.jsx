import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Clapperboard, Search, Share2, Sparkles, Target, Users, Video,
} from 'lucide-react';
import { fadeUp } from '../../lib/motion';

/**
 * "Build Your Growth Stack" — the one genuinely interactive tool on the page.
 * A prospect picks the channels their business needs, sees them assemble into
 * one system in real time, and gets a package recommendation with a CTA that
 * carries the selection straight into the contact form (?message=...), so the
 * enquiry that lands in the inbox is already scoped.
 */
const channels = [
  { key: 'Digital Marketing', icon: Target },
  { key: 'SEO', icon: Search },
  { key: 'Social Media Management', icon: Share2 },
  { key: 'Branding', icon: Sparkles },
  { key: 'Video Production', icon: Clapperboard },
  { key: 'AI Videos', icon: Video },
  { key: 'Influencer Marketing', icon: Users },
];

const tierFor = (count) => {
  if (count === 0) return null;
  if (count <= 2) return { name: 'Starter', tagline: 'Get found' };
  if (count <= 4) return { name: 'Growth', tagline: 'Get leads' };
  return { name: 'Scale', tagline: 'Get market share' };
};

const MediaStackBuilder = () => {
  const [selected, setSelected] = useState([]);

  const toggle = (key) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const tier = tierFor(selected.length);

  const contactHref = useMemo(() => {
    if (!selected.length) return '/contact';
    const msg = `I'm interested in: ${selected.join(', ')}. Please send me a plan.`;
    return `/contact?message=${encodeURIComponent(msg)}`;
  }, [selected]);

  return (
    <section id="stack-builder" className="bg-[#111111] text-[#F7F8F6] py-20 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-500" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-white/40">TRY IT</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight mb-6 text-balance">
            Build your growth stack.
          </h2>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl">
            Pick what your business needs right now. We'll show you how it comes together —
            and which starting point fits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Chips */}
          <motion.div {...fadeUp(0.05)} className="lg:col-span-7">
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {channels.map(({ key, icon: Icon }) => {
                const active = selected.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    aria-pressed={active}
                    className={`group inline-flex items-center gap-2.5 rounded-2xl border px-4 py-3 md:px-5 md:py-3.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                      active
                        ? 'border-green-500 bg-green-500 text-[#111111]'
                        : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:bg-white/[0.06]'
                    }`}
                  >
                    <Icon size={15} className={active ? 'text-[#111111]' : 'text-white/40 group-hover:text-white/60'} />
                    {key}
                    {active && <Check size={14} strokeWidth={3} className="text-[#111111]" />}
                  </button>
                );
              })}
            </div>

            <p className="text-[13px] text-white/35 mt-6">
              {selected.length === 0
                ? 'Nothing selected yet — pick at least one channel.'
                : `${selected.length} channel${selected.length > 1 ? 's' : ''} selected.`}
            </p>
          </motion.div>

          {/* Live stack + recommendation */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/35 mb-5">YOUR STACK</p>

              <div className="min-h-[92px] flex flex-col gap-2 mb-6">
                <AnimatePresence mode="popLayout">
                  {selected.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-white/30 italic"
                    >
                      Your selected channels will stack up here.
                    </motion.p>
                  ) : (
                    selected.map((key, i) => (
                      <motion.div
                        key={key}
                        layout
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/10 px-3.5 py-2.5"
                      >
                        <span className="font-mono text-[10px] text-green-500 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-medium text-white/80">{key}</span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="rounded-2xl bg-green-500/10 border border-green-500/25 p-4 md:p-5">
                <AnimatePresence mode="wait">
                  {tier ? (
                    <motion.div
                      key={tier.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-[11px] font-mono tracking-[0.2em] text-green-500 mb-1.5">
                        SUGGESTED STARTING POINT
                      </p>
                      <p className="font-heading text-xl md:text-2xl font-semibold tracking-tight">
                        {tier.name} — {tier.tagline}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-white/40"
                    >
                      Select a channel to see a suggested starting point.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to={contactHref}
                className={`group mt-5 inline-flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-semibold transition-colors ${
                  selected.length
                    ? 'bg-green-500 text-[#111111] hover:bg-green-400'
                    : 'bg-white/[0.06] text-white/40 pointer-events-none'
                }`}
              >
                Get a plan for this mix
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MediaStackBuilder;
