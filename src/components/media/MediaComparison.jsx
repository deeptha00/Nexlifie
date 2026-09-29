import { motion } from 'framer-motion';
import { Check, Minus, X } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

/* 'yes' | 'partial' | 'no' — keep this honest; a rigged table reads as a rigged table. */
const rows = [
  {
    criterion: 'Strategy written down before spend starts',
    freelancer: 'no',
    agency: 'partial',
    nexlifie: 'yes',
  },
  {
    criterion: 'Marketing, brand, video and social under one team',
    freelancer: 'no',
    agency: 'yes',
    nexlifie: 'yes',
  },
  {
    criterion: 'Reporting tied to leads, not impressions',
    freelancer: 'partial',
    agency: 'partial',
    nexlifie: 'yes',
  },
  {
    criterion: 'Can fix the website too, not just the marketing',
    freelancer: 'no',
    agency: 'no',
    nexlifie: 'yes',
  },
  {
    criterion: 'Turnaround measured in days',
    freelancer: 'partial',
    agency: 'no',
    nexlifie: 'yes',
  },
  {
    criterion: 'One person accountable for the whole result',
    freelancer: 'no',
    agency: 'partial',
    nexlifie: 'yes',
  },
];

const Mark = ({ state, highlight }) => {
  if (state === 'yes') {
    return (
      <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${highlight ? 'bg-green-500' : 'bg-white/10'}`}>
        <Check size={13} className={highlight ? 'text-[#111111]' : 'text-white/70'} strokeWidth={3} />
      </span>
    );
  }
  if (state === 'partial') {
    return (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-white/[0.06]">
        <Minus size={13} className="text-white/40" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex w-6 h-6 rounded-full items-center justify-center bg-white/[0.04]">
      <X size={13} className="text-white/25" strokeWidth={3} />
    </span>
  );
};

const columns = [
  { key: 'freelancer', label: 'Freelancer' },
  { key: 'agency', label: 'Typical agency' },
  { key: 'nexlifie', label: 'Nexlifie Media', highlight: true },
];

const MediaComparison = () => (
  <section className="bg-[#111111] text-[#F7F8F6] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-500" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/40">HONEST COMPARISON</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight mb-6 text-balance">
          Freelancers are cheap.<br />Agencies are slow.
        </h2>
        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl">
          Both work for some businesses — we will tell you if yours is one of them.
          Here is where we are genuinely different.
        </p>
      </motion.div>

      {/* Desktop table */}
      <motion.div {...staggerParent(0.05)} className="hidden md:block max-w-5xl">
        <div className="grid grid-cols-12 items-end pb-5 border-b border-white/15">
          <span className="col-span-6 text-[11px] font-mono tracking-[0.2em] text-white/30">WHAT MATTERS</span>
          {columns.map((c) => (
            <span
              key={c.key}
              className={`col-span-2 text-center text-xs font-semibold tracking-wide ${c.highlight ? 'text-green-500' : 'text-white/40'}`}
            >
              {c.label}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <motion.div
            key={row.criterion}
            variants={staggerItem}
            className="grid grid-cols-12 items-center py-5 border-b border-white/[0.08] hover:bg-white/[0.02] transition-colors duration-300"
          >
            <span className="col-span-6 text-[15px] text-white/75 pr-8">{row.criterion}</span>
            {columns.map((c) => (
              <span key={c.key} className="col-span-2 flex justify-center">
                <Mark state={row[c.key]} highlight={c.highlight} />
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile — one card per criterion */}
      <motion.div {...staggerParent(0.05)} className="md:hidden">
        {rows.map((row) => (
          <motion.div key={row.criterion} variants={staggerItem} className="border-t border-white/12 py-6">
            <p className="text-[15px] text-white/80 leading-snug mb-4">{row.criterion}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {columns.map((c) => (
                <span key={c.key} className="inline-flex items-center gap-2">
                  <Mark state={row[c.key]} highlight={c.highlight} />
                  <span className={`text-xs ${c.highlight ? 'text-green-500 font-semibold' : 'text-white/40'}`}>{c.label}</span>
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.1, 16)} className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-[11px] font-mono tracking-wider text-white/30">
        <span className="inline-flex items-center gap-2"><Mark state="yes" /> Consistently</span>
        <span className="inline-flex items-center gap-2"><Mark state="partial" /> Depends who you hire</span>
        <span className="inline-flex items-center gap-2"><Mark state="no" /> Rarely</span>
      </motion.div>
    </div>
  </section>
);

export default MediaComparison;
