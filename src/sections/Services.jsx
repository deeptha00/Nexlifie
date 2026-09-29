import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, Smartphone, Code, Layers, Cpu, Cloud,
  PenTool, ShoppingCart, Megaphone, Search, Gamepad2, ArrowUpRight,
} from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../lib/motion';

const services = [
  { icon: Globe, slug: 'website-development', title: 'Website Development' },
  { icon: Smartphone, slug: 'mobile-apps', title: 'Mobile Apps' },
  { icon: Code, slug: 'web-applications', title: 'Web Applications' },
  { icon: Cpu, slug: 'ai-solutions', title: 'AI Solutions' },
  { icon: Layers, slug: 'custom-software', title: 'Custom Software' },
  { icon: Cloud, slug: 'cloud-solutions', title: 'Cloud Solutions' },
  { icon: PenTool, slug: 'ui-ux-design', title: 'UI / UX Design' },
  { icon: ShoppingCart, slug: 'ecommerce', title: 'E-commerce' },
  { icon: Megaphone, slug: 'digital-marketing', title: 'Digital Marketing' },
  { icon: Search, slug: 'seo-optimization', title: 'SEO Optimization' },
  { icon: Gamepad2, slug: 'gaming-applications', title: 'Gaming Applications' },
];

const Services = () => (
  <section id="services" className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="flex items-end justify-between gap-6 mb-12 md:mb-14">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">CORE SERVICES</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
            One partner.<br />Every capability.
          </h2>
        </div>
      </motion.div>

      <motion.div
        {...staggerParent(0.05, 0.1)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[rgb(var(--ink-rgb)/12%)]"
      >
        {services.map((s) => (
          <motion.div key={s.slug} variants={staggerItem}>
            <Link
              to={`/services/${s.slug}`}
              className="group border-r border-b border-[rgb(var(--ink-rgb)/12%)] p-7 md:p-8 flex items-center justify-between gap-4 hover:bg-[rgb(var(--ink-rgb)/2%)] transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <s.icon size={20} className="text-[rgb(var(--ink-rgb)/35%)] group-hover:text-green-600 group-hover:scale-110 transition-all duration-300 shrink-0" />
                <span className="text-sm md:text-base font-semibold text-[rgb(var(--ink-rgb)/80%)] group-hover:text-[var(--secondary)] transition-colors">
                  {s.title}
                </span>
              </div>
              <ArrowUpRight size={16} className="text-[rgb(var(--ink-rgb)/20%)] group-hover:text-green-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Services;
