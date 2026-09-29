import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroVideo from '../../assets/video.mp4';
import { fadeUp } from '../../lib/motion';

const facts = [
  { label: 'Verticals', value: 'Development / Media' },
  { label: 'Focus', value: 'Technology + Growth' },
  { label: 'Reach', value: 'Global' },
];

const reveal = fadeUp;

const AboutHero = () => (
  <section className="relative min-h-[86vh] flex items-end overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#111111]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-[#111111]/10" />
    </div>

    <div className="relative z-10 mx-auto max-w-[1320px] px-6 md:px-10 pt-40 pb-0 w-full">
      <motion.div {...reveal(0)} className="flex items-center gap-3 mb-7">
        <span className="w-6 h-[1px] bg-green-500" />
        <span className="text-[11px] font-mono tracking-[0.3em] text-white/60">ABOUT NEXLIFIE</span>
      </motion.div>

      <motion.h1
        {...reveal(0.1)}
        className="font-heading text-[40px] leading-[1.1] sm:text-6xl sm:leading-[1.06] md:text-7xl md:leading-[1.04] font-bold tracking-tight text-white mb-8 max-w-2xl text-balance"
      >
        We build <span className="text-green-400">what's next.</span>
      </motion.h1>

      <motion.p {...reveal(0.2)} className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-10">
        Nexlifie operates across two verticals — Nexlifie Development builds the digital products and software systems businesses run on, and Nexlifie Media builds the marketing and brand presence that gets them seen.
      </motion.p>

      <motion.div {...reveal(0.3)} className="flex flex-wrap items-center gap-4 mb-14">
        <Link
          to="/development"
          className="group inline-flex items-center gap-2 bg-green-500 text-[#111111] text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-green-400 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300"
        >
          See What We Build
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 border border-white/25 text-white text-sm font-semibold px-7 py-4 rounded-2xl hover:border-white/60 hover:bg-white/5 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300"
        >
          Start a Project
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <motion.div {...reveal(0.4)} className="grid grid-cols-3 border-t border-white/15">
        {facts.map((fact) => (
          <div key={fact.label} className="group border-r border-white/15 last:border-r-0 py-5 pr-4 hover:bg-white/5 transition-colors duration-300">
            <p className="font-mono text-[9px] tracking-widest text-white/40 mb-1.5">{fact.label.toUpperCase()}</p>
            <p className="text-sm md:text-base font-bold text-white leading-tight">{fact.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutHero;
