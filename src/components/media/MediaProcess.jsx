import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

const steps = [
  {
    index: '01',
    title: 'We learn the business',
    desc: 'Your customers, your margins, what has already been tried. No plan is worth anything without this part.',
    yours: 'You get: an honest read on where the opportunity actually is.',
  },
  {
    index: '02',
    title: 'We write the plan',
    desc: 'Which channels, in what order, with what budget split and what we are aiming at — agreed before anything is built.',
    yours: 'You get: the strategy in writing, not in a meeting.',
  },
  {
    index: '03',
    title: 'We build and launch',
    desc: 'Brand, content, video and campaigns produced in-house, with reporting set up before anything goes live.',
    yours: 'You get: work live, and the ability to see what it does.',
  },
  {
    index: '04',
    title: 'We report and adjust',
    desc: 'What ran, what it cost, what came back, and what changes next. Then we do it again, better.',
    yours: 'You get: a clear picture every cycle — no guessing.',
  },
];

const MediaProcess = () => (
  <section id="process" className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">WHAT WORKING WITH US LOOKS LIKE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] mb-6 text-balance">
          No mystery. Four steps.
        </h2>
        <p className="text-[rgb(var(--ink-rgb)/55%)] text-base md:text-lg font-light leading-relaxed max-w-xl">
          You should know exactly what happens after you sign, and what you get out of
          each stage. This is it.
        </p>
      </motion.div>

      {/* Desktop — horizontal timeline */}
      <motion.div {...staggerParent(0.1, 0.05)} className="hidden md:grid grid-cols-4 relative">
        <div className="absolute top-[6px] left-0 right-0 h-[1px] bg-[rgb(var(--ink-rgb)/15%)]" />
        {steps.map((step) => (
          <motion.div key={step.title} variants={staggerItem} className="group relative pr-8 last:pr-0">
            <span className="block w-3 h-3 rounded-full bg-green-600 mb-6 relative z-10 ring-4 ring-[var(--bg-dark)] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-mono text-xs text-[rgb(var(--ink-rgb)/40%)] tracking-widest">{step.index}</span>
            <h3 className="font-heading text-xl lg:text-2xl font-semibold text-[var(--secondary)] mt-2 mb-3">{step.title}</h3>
            <p className="text-sm text-[rgb(var(--ink-rgb)/55%)] leading-relaxed pr-4 mb-4">{step.desc}</p>
            <p className="text-[13px] text-green-600 font-medium leading-snug pr-4">{step.yours}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile — vertical stack */}
      <motion.div {...staggerParent(0.08, 0.05)} className="md:hidden flex flex-col">
        {steps.map((step) => (
          <motion.div
            key={step.title}
            variants={staggerItem}
            className="border-t border-[rgb(var(--ink-rgb)/12%)] py-7 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-xs text-green-600 tracking-widest">{step.index}</span>
              <h3 className="font-heading text-xl font-semibold text-[var(--secondary)]">{step.title}</h3>
            </div>
            <p className="text-sm text-[rgb(var(--ink-rgb)/55%)] leading-relaxed mb-3">{step.desc}</p>
            <p className="text-[13px] text-green-600 font-medium leading-snug">{step.yours}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.15, 16)} className="mt-14 md:mt-16 pt-10 border-t border-[rgb(var(--ink-rgb)/12%)] flex flex-wrap items-center justify-between gap-6">
        <p className="font-heading text-xl md:text-2xl font-medium text-[var(--secondary)] max-w-md">
          Step one starts with a conversation.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-green-700 transition-colors"
        >
          Start the conversation
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default MediaProcess;
