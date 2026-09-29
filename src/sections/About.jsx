import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../lib/motion';

const stats = [
  { value: '15', suffix: '+', label: 'Projects Delivered' },
  { value: '2', suffix: '', label: 'Business Verticals' },
  { value: '100', suffix: '%', label: 'Global Scale' },
  { value: '5+', suffix: '', label: 'Industries Served' },
];

const About = () => (
  <section id="about" className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        <motion.div {...fadeUp(0)} className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">ABOUT NEXLIFIE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] mb-6 text-balance">
            We build scalable<br />futures.
          </h2>
          <p className="text-[rgb(var(--muted-rgb))] text-base md:text-lg leading-relaxed max-w-md mb-8">
            We help manufacturing, educational institutions, healthcare organizations and startups grow with premium websites, AI solutions, custom software and marketing systems.
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/30%)] pb-1 hover:border-green-600 hover:text-green-700 transition-colors"
          >
            More About Us
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          {...staggerParent(0.1, 0.1)}
          className="lg:col-span-6 grid grid-cols-2 border-t border-l border-[rgb(var(--ink-rgb)/12%)]"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="border-r border-b border-[rgb(var(--ink-rgb)/12%)] p-7 md:p-9 hover:bg-[rgb(var(--ink-rgb)/1.5%)] transition-colors duration-500"
            >
              <div className="flex items-baseline gap-1 mb-3">
                <h4 className="font-heading text-4xl md:text-5xl font-bold text-[var(--secondary)] tabular-nums">{stat.value}</h4>
                <span className="font-heading text-2xl md:text-3xl font-bold text-green-600">{stat.suffix}</span>
              </div>
              <p className="text-xs md:text-sm text-[rgb(var(--muted-rgb))] font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
