import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle } from './parts';

const steps = [
  { index: '01', title: 'Discover', desc: 'Understand your business, users, goals and workflow.' },
  { index: '02', title: 'Plan', desc: 'Define the product, architecture and technology.' },
  { index: '03', title: 'Design', desc: 'Create the experience, interface and system structure.' },
  { index: '04', title: 'Build', desc: 'Develop, integrate, test and deploy.' },
  { index: '05', title: 'Scale', desc: 'Improve, automate and expand as your business grows.' },
];

const DevelopmentProcess = () => (
  <section id="process" className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-16 md:mb-20">
        <Eyebrow className="mb-6">HOW WE WORK</Eyebrow>
        <SectionTitle>
          From Business Problem<br />to Working Product.
        </SectionTitle>
      </motion.div>

      {/* Desktop — one continuous line */}
      <motion.div {...staggerParent(0.1, 0.05)} className="hidden md:grid grid-cols-5 relative">
        <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[rgb(var(--ink-rgb)/15%)]" aria-hidden="true" />
        {steps.map((step) => (
          <motion.div key={step.title} variants={staggerItem} className="relative pr-6 lg:pr-10 last:pr-0">
            <span
              className="block w-[11px] h-[11px] rounded-full bg-green-600 mb-6 relative z-10 ring-4 ring-[var(--bg-dark)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-[rgb(var(--muted-rgb))] tracking-widest">{step.index}</span>
            <h3 className="font-heading text-lg lg:text-2xl font-bold tracking-tight text-[var(--secondary)] mt-2 mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile — stacked */}
      <motion.div {...staggerParent(0.08, 0.05)} className="md:hidden flex flex-col">
        {steps.map((step) => (
          <motion.div
            key={step.title}
            variants={staggerItem}
            className="border-t border-[rgb(var(--ink-rgb)/12%)] py-6 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-xs text-green-600 tracking-widest">{step.index}</span>
              <h3 className="font-heading text-xl font-bold tracking-tight text-[var(--secondary)]">{step.title}</h3>
            </div>
            <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        {...fadeUp(0.1)}
        className="mt-16 md:mt-20 pt-10 border-t border-[rgb(var(--ink-rgb)/10%)] font-heading text-2xl sm:text-3xl md:text-[38px] leading-[1.18] font-bold tracking-tight text-[var(--secondary)] max-w-3xl text-balance"
      >
        You're not just hiring developers.{' '}
        <span className="text-[var(--primary)]">You're gaining a technology partner.</span>
      </motion.p>
    </div>
  </section>
);

export default DevelopmentProcess;
