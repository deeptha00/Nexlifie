import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';
import { CTAButton, CTAGhost } from './parts';

const DevelopmentCTA = () => (
  <section className="bg-[#111111] text-[#F7F8F6] pt-24 pb-20 md:pt-32 md:pb-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0, 30)} className="max-w-3xl">
        <h2 className="font-heading text-[38px] leading-[1.08] sm:text-5xl sm:leading-[1.06] md:text-6xl md:leading-[1.04] font-bold tracking-tight mb-8 text-balance">
          Your business is unique.<br />
          <span className="text-green-400">Your software should be too.</span>
        </h2>

        <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-10">
          Tell us what you're trying to build, automate or improve. We'll help you turn the idea
          into a working digital solution.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CTAButton to="/contact" tone="green">Start a Project</CTAButton>
          <CTAGhost to="/contact" tone="dark">Talk to a Nexlifie Expert</CTAGhost>
        </div>

        <p className="font-mono text-[11px] tracking-[0.18em] text-white/35">
          WEBSITES • APPS • CUSTOM SOFTWARE • AI • GAMES
        </p>
      </motion.div>
    </div>
  </section>
);

export default DevelopmentCTA;
