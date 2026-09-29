import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

const OurStory = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
        <motion.div {...fadeUp(0)} className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">OUR STORY</span>
          </div>
          <p className="font-heading text-2xl md:text-[32px] leading-[1.3] font-medium text-[var(--secondary)] border-l-2 border-green-600 pl-6 md:pl-8 text-balance">
            Technology should solve real problems — not simply exist for the sake of being technology.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="lg:col-span-7 flex flex-col gap-6 lg:pt-1">
          <p className="text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed">
            Nexlifie was built around a simple idea: technology should solve real problems, not simply exist for the sake of being technology.
          </p>
          <p className="text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed">
            We work with businesses to transform ideas, processes and challenges into practical digital solutions — from websites and mobile applications to custom software, AI, cloud infrastructure and digital growth.
          </p>
          <p className="text-base md:text-lg text-[rgb(var(--muted-rgb))] leading-relaxed">
            Our approach brings design, engineering and business thinking together so every solution is built with purpose, usability and long-term scalability in mind.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default OurStory;
