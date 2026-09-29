import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Code2, Megaphone } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem, lift } from '../lib/motion';

const verticals = [
  {
    key: 'development',
    icon: Code2,
    tag: 'THE PRODUCT',
    title: 'Nexlifie Development',
    to: '/development',
    description: 'Websites, applications, AI and cloud infrastructure engineered for real workflows and long-term scale.',
    capabilities: ['Websites', 'Mobile & Web Apps', 'AI & Automation', 'Cloud & Security'],
  },
  {
    key: 'media',
    icon: Megaphone,
    tag: 'THE PRESENCE',
    title: 'Nexlifie Media',
    to: '/media',
    description: 'Marketing, brand and content strategy that gets a business discovered, trusted and remembered.',
    capabilities: ['Digital Marketing', 'SEO', 'Branding & Creative', 'Social & Content'],
  },
];

const Verticals = () => {
  const navigate = useNavigate();

  return (
    <section id="verticals" className="relative bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 relative">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">TWO VERTICALS. ONE MISSION.</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
            Everything a business needs<br />to build and be seen.
          </h2>
        </motion.div>

        <motion.div
          {...staggerParent(0.12, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[rgb(var(--ink-rgb)/12%)] border-t border-b border-[rgb(var(--ink-rgb)/12%)]"
        >
          {verticals.map((v) => (
            <motion.button
              key={v.key}
              variants={staggerItem}
              whileHover={lift}
              onClick={() => navigate(v.to)}
              className="group text-left py-10 md:py-14 md:px-12 first:md:pl-0 last:md:pr-0 flex flex-col hover:bg-[rgb(var(--ink-rgb)/1.5%)] transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-[rgb(var(--muted-rgb))] tracking-widest">{v.tag}</span>
                <v.icon size={20} className="text-[rgb(var(--ink-rgb)/30%)] group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--secondary)] mb-4 group-hover:text-green-700 transition-colors">
                {v.title}
              </h3>
              <p className="text-sm md:text-base text-[rgb(var(--muted-rgb))] leading-relaxed max-w-sm mb-6">
                {v.description}
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm text-[rgb(var(--ink-rgb)/60%)] font-medium mb-8">
                {v.capabilities.map((cap, idx) => (
                  <span key={cap} className="inline-flex items-center">
                    {cap}
                    {idx < v.capabilities.length - 1 && <span className="mx-2.5 text-[rgb(var(--ink-rgb)/20%)]">/</span>}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] group-hover:text-green-700 transition-colors">
                Explore {v.title}
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Verticals;
