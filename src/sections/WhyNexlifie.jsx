import { motion } from 'framer-motion';
import { Boxes, Activity, Cloud, Shield } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../lib/motion';

const features = [
  { title: 'Elite Design', icon: Boxes, code: 'UI / UX' },
  { title: 'AI Integrated', icon: Activity, code: 'AI TECH' },
  { title: 'High Speed', icon: Cloud, code: 'CLOUD' },
  { title: 'Max Security', icon: Shield, code: 'SECURE' },
];

const WhyNexlifie = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">WHY NEXLIFIE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
          Built for businesses<br />that expect more.
        </h2>
      </motion.div>

      <motion.div
        {...staggerParent(0.08, 0.1)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgb(var(--ink-rgb)/12%)]"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={staggerItem}
            className="group border-r border-b border-[rgb(var(--ink-rgb)/12%)] p-8 md:p-10 hover:bg-[rgb(var(--ink-rgb)/1.5%)] transition-colors duration-500"
          >
            <feature.icon size={22} className="text-[rgb(var(--ink-rgb)/40%)] group-hover:text-green-600 group-hover:scale-110 transition-all duration-300 mb-6" />
            <p className="font-mono text-[10px] tracking-widest text-[rgb(var(--muted-rgb))] mb-3">{feature.code}</p>
            <h4 className="font-heading text-xl md:text-2xl font-bold text-[var(--secondary)]">{feature.title}</h4>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyNexlifie;
