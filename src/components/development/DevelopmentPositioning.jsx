import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

const triad = ['Your Business.', 'Your Workflow.', 'Your Software.'];

/**
 * The single idea the whole page rests on. Deliberately almost empty — it is a
 * statement, not a section, and it earns its space by being the only thing here.
 */
const DevelopmentPositioning = () => (
  <section className="bg-[var(--bg-dark)] border-y border-[rgb(var(--ink-rgb)/10%)] py-20 md:py-28">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div {...fadeUp(0)} className="lg:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-7">
            WHAT THIS COMES DOWN TO
          </p>
          <p className="font-heading text-[26px] leading-[1.2] sm:text-[34px] sm:leading-[1.18] md:text-[42px] md:leading-[1.15] font-bold tracking-tight text-[var(--secondary)] text-balance">
            We don't just build software.{' '}
            <span className="text-[var(--primary)]">
              We build the software your business actually needs.
            </span>
          </p>
        </motion.div>

        <motion.div
          {...staggerParent(0.12, 0.1)}
          className="lg:col-span-5 lg:border-l lg:border-[rgb(var(--ink-rgb)/12%)] lg:pl-14"
        >
          {triad.map((line) => (
            <motion.p
              key={line}
              variants={staggerItem}
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[var(--secondary)] leading-tight mb-1.5 last:mb-0"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default DevelopmentPositioning;
