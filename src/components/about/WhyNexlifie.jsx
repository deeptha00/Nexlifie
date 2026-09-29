import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

const points = [
  {
    number: '01',
    title: 'End-to-End Capability',
    desc: 'Design, development, infrastructure and digital growth under one technology partner.',
  },
  {
    number: '02',
    title: 'Business-First Thinking',
    desc: 'We focus on solving the underlying business problem, not simply delivering software.',
  },
  {
    number: '03',
    title: 'Modern Technology',
    desc: 'We use modern technologies and development practices to create adaptable digital products.',
  },
  {
    number: '04',
    title: 'Long-Term Partnership',
    desc: 'We aim to remain a technology partner beyond the initial launch.',
  },
];

const WhyNexlifie = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">WHY NEXLIFIE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold tracking-tight text-[var(--secondary)] text-balance">
          Built for businesses that<br />want to move forward.
        </h2>
      </motion.div>

      <motion.div
        {...staggerParent(0.08, 0.1)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgb(var(--ink-rgb)/12%)]"
      >
        {points.map((point) => (
          <motion.div
            key={point.number}
            variants={staggerItem}
            className="border-r border-b border-[rgb(var(--ink-rgb)/12%)] p-7 md:p-8 hover:bg-[rgb(var(--ink-rgb)/1.5%)] transition-colors duration-500"
          >
            <span className="font-mono text-xs text-green-600 tracking-widest block mb-4">{point.number}</span>
            <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-[var(--secondary)] mb-3">
              {point.title}
            </h3>
            <p className="text-[rgb(var(--muted-rgb))] text-sm leading-relaxed">
              {point.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyNexlifie;
