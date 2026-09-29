import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { highlights, systemIncludes } from '../../data/mediaOffer';

const reveal = fadeUp;
const MotionLink = motion(Link);

const MediaHero = () => (
  <section className="relative bg-[var(--bg-dark)] overflow-hidden">
    <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Pitch */}
        <div className="lg:col-span-7">
          <motion.div {...reveal(0)} className="flex items-center gap-3 mb-7">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">NEXLIFIE / MEDIA · BENGALURU</span>
          </motion.div>

          <motion.h1
            {...reveal(0.1)}
            className="font-heading text-[40px] leading-[1.08] sm:text-6xl sm:leading-[1.04] md:text-[68px] md:leading-[1.02] font-semibold tracking-tight text-[var(--secondary)] mb-7 text-balance"
          >
            Marketing that brings in{' '}
            <span className="text-green-600">customers</span>, not just likes.
          </motion.h1>

          <motion.p
            {...reveal(0.2)}
            className="text-base md:text-lg text-[rgb(var(--ink-rgb)/60%)] font-light leading-relaxed max-w-xl mb-9"
          >
            Digital marketing, branding, SEO, video and social — run as one growth system,
            by one team, against the numbers you actually care about. Based in Bengaluru,
            working with businesses across India and worldwide.
          </motion.p>

          <motion.div {...reveal(0.3)} className="flex flex-wrap items-center gap-4">
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-7 py-4 rounded-2xl shadow-[0_10px_30px_-10px_rgba(22,163,74,0.5)] hover:bg-green-700 transition-colors"
            >
              Talk to us about growth
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MotionLink>
            <a
              href="#stack-builder"
              className="group inline-flex items-center gap-2 border border-[rgb(var(--ink-rgb)/20%)] text-[var(--secondary)] text-sm font-semibold px-7 py-4 rounded-2xl hover:border-[rgb(var(--ink-rgb)/50%)] hover:bg-[rgb(var(--ink-rgb)/4%)] transition-colors"
            >
              Build your growth stack
            </a>
          </motion.div>

          <motion.ul {...reveal(0.4)} className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[13px] text-[rgb(var(--ink-rgb)/50%)]">
                <Check size={14} className="text-green-600 shrink-0" strokeWidth={3} />
                {h}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* What working with us actually looks like */}
        <motion.div {...reveal(0.25, 32)} className="lg:col-span-5">
          <div className="relative rounded-3xl bg-[#111111] text-[#F7F8F6] p-7 md:p-9 overflow-hidden shadow-[var(--shadow-soft)]">
            <span className="absolute -top-6 -right-4 font-heading text-[150px] font-black text-white/[0.04] leading-none select-none pointer-events-none">
              SEEN
            </span>
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-green-500">THE GROWTH SYSTEM</span>
              </div>
              <p className="font-heading text-2xl md:text-[28px] leading-[1.15] font-semibold mb-7">
                One team, one plan, one place the numbers land.
              </p>
              <ul className="space-y-3.5 mb-8">
                {systemIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                    <Check size={15} className="text-green-500 shrink-0 mt-[3px]" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="group flex items-center justify-between gap-3 w-full bg-white/[0.06] hover:bg-green-500 hover:text-[#111111] border border-white/10 hover:border-green-500 rounded-2xl px-5 py-4 text-sm font-semibold transition-colors"
              >
                Tell us your goal
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-[11px] text-white/35 mt-4 text-center">
                Tell us where you want the business to go — we will tell you how we would get there.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MediaHero;
