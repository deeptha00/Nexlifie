import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => (
  <section className="bg-[#111111] text-[#F7F8F6] pt-24 pb-20 md:pt-36 md:pb-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-balance">
          We don't just build software.<br />
          <span className="text-green-500">We build what's next.</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
          Tell us what you're building, what you're trying to improve or where you want to go next.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-green-500 text-[#111111] text-sm font-semibold px-8 py-5 rounded-2xl hover:bg-green-400 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300"
          >
            Start a Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/development"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/30 pb-1 hover:border-green-500 hover:text-green-400 transition-colors"
          >
            See What We Build
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
