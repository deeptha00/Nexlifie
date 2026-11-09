import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

const CareersHero = () => (
  <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[rgb(var(--ink-rgb)/10%)]">
    <div className="absolute inset-0 digital-grid-system mask-radial opacity-20 pointer-events-none" />
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[640px] h-[640px] bg-green-500/8 blur-[140px] rounded-full pointer-events-none" />

    <div className="relative mx-auto max-w-[1320px] px-6 md:px-10 text-center">
      <motion.div {...fadeUp(0)} className="inline-flex items-center gap-3 mb-6 justify-center">
        <span className="w-6 h-[1px] bg-green-600" />
        <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">CAREERS</span>
        <span className="w-6 h-[1px] bg-green-600" />
      </motion.div>

      <motion.h1
        {...fadeUp(0.08)}
        className="font-heading text-4xl sm:text-6xl md:text-[72px] leading-[1.05] font-bold tracking-tight text-[var(--secondary)] text-balance"
      >
        Build Your Future<br />With Nexlifie.
      </motion.h1>

      <motion.p
        {...fadeUp(0.16)}
        className="mt-7 max-w-xl mx-auto text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed"
      >
        We're a small, fast-moving team building AI-powered products, secure digital systems, and marketing for real clients. If you'd rather ship than sit in meetings about shipping, you'll fit right in.
      </motion.p>

      <motion.div {...fadeUp(0.24)} className="mt-10">
        <a
          href="#openings"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-black transition-colors"
        >
          View Open Positions
          <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default CareersHero;
