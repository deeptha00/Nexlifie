import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

const MediaWhyNexlifie = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div
        {...fadeUp(0)}
        className="max-w-3xl mb-16 md:mb-20"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">WHY NEXLIFIE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] mb-6 text-balance">
          Technology <span className="text-green-600">×</span> Creativity <span className="text-green-600">×</span> Growth
        </h2>
        <p className="text-[rgb(var(--ink-rgb)/55%)] text-base md:text-lg font-light leading-relaxed max-w-xl">
          We combine technology, creative thinking and marketing to build digital experiences that move businesses forward.
        </p>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgb(var(--ink-rgb)/12%)] border-t border-[rgb(var(--ink-rgb)/12%)]"
      >
        <Link to="/development" className="group py-10 md:py-12 md:pr-12 flex items-start justify-between gap-6 hover:bg-[rgb(var(--ink-rgb)/2%)] transition-colors duration-300">
          <div>
            <span className="font-mono text-[11px] text-[rgb(var(--ink-rgb)/40%)] tracking-widest">THE PRODUCT</span>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--secondary)] mt-3 mb-3">Nexlifie Development</h3>
            <p className="text-sm text-[rgb(var(--ink-rgb)/55%)] max-w-sm leading-relaxed">
              Websites, applications and infrastructure engineered for real workflows and long-term scale.
            </p>
          </div>
          <ArrowUpRight size={22} className="shrink-0 mt-1 text-[rgb(var(--ink-rgb)/30%)] group-hover:text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </Link>
        <Link to="/media" className="group py-10 md:py-12 md:pl-12 flex items-start justify-between gap-6 hover:bg-[rgb(var(--ink-rgb)/2%)] transition-colors duration-300">
          <div>
            <span className="font-mono text-[11px] text-[rgb(var(--ink-rgb)/40%)] tracking-widest">THE PRESENCE</span>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--secondary)] mt-3 mb-3">Nexlifie Media</h3>
            <p className="text-sm text-[rgb(var(--ink-rgb)/55%)] max-w-sm leading-relaxed">
              Marketing, brand and content that gets what's built in front of the right audience.
            </p>
          </div>
          <ArrowUpRight size={22} className="shrink-0 mt-1 text-[rgb(var(--ink-rgb)/30%)] group-hover:text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default MediaWhyNexlifie;
