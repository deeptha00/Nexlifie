import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { faqs } from '../../data/mediaOffer';

const Item = ({ faq, isOpen, onToggle, index }) => (
  <motion.div {...fadeUp(index * 0.04, 16)} className="border-b border-[rgb(var(--ink-rgb)/12%)] first:border-t">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group w-full flex items-center justify-between gap-6 text-left py-6 md:py-7"
    >
      <span className="font-heading text-lg md:text-[22px] font-medium tracking-tight text-[var(--secondary)] group-hover:text-green-700 transition-colors">
        {faq.q}
      </span>
      <Plus
        size={20}
        className={`shrink-0 text-[rgb(var(--ink-rgb)/35%)] group-hover:text-green-600 transition-all duration-300 ${
          isOpen ? 'rotate-45 text-green-600' : ''
        }`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="text-sm md:text-base text-[rgb(var(--ink-rgb)/60%)] leading-relaxed max-w-2xl pb-7 pr-10">
            {faq.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const MediaFAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <motion.div {...fadeUp(0)} className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-green-600" />
              <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">BEFORE YOU ASK</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] mb-6 text-balance">
              The questions everyone asks.
            </h2>
            <p className="text-[rgb(var(--ink-rgb)/55%)] text-base leading-relaxed max-w-sm mb-6">
              Straight answers, so you are not chasing us for them.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/30%)] pb-1 hover:border-green-600 hover:text-green-700 transition-colors"
            >
              Ask us something else
            </Link>
          </motion.div>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <Item
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaFAQ;
