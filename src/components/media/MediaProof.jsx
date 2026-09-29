import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import kriyora from '../../assets/Logos/1. Primary Logo.PNG';
import epicverse from '../../assets/Logos/logo-wordmark.webp';
import rrventures from '../../assets/Logos/logo 2.png';
import eyeluxe from '../../assets/Logos/eyeluxe_logo.png';
import trainifie from '../../assets/Logos/trainifie_logo.png';

/* The brands Nexlifie Media runs marketing for. `scale` nudges logos that sit
   small inside their own canvas — same values used in the clients marquee. */
const brands = [
  { name: 'Kriyora', logo: kriyora },
  { name: 'Epic Verse', logo: epicverse },
  { name: 'RR Ventures', logo: rrventures },
  { name: 'Eyeluxe', logo: eyeluxe },
  { name: 'Trainifie', logo: trainifie, scale: 2.2 },
];

const testimonials = [
  {
    client: 'Bumblebee',
    text: 'Nexlifie delivered an excellent website and marketing system for our business. Their team is professional, fast, and highly skilled.',
  },
  {
    client: 'Eyéluxe',
    text: 'Excellent service, modern design, and strong technical support. Nexlifie is the right choice for any business looking to grow digitally.',
  },
];

/**
 * TODO: when you have verified reporting numbers for any of these brands
 * (traffic, enquiries, ROAS), a single real figure here will outperform
 * everything else on this page.
 */
const facts = [
  { value: '15+', label: 'Projects delivered' },
  { value: '5+', label: 'Industries served' },
  { value: '1', label: 'Team for product & marketing' },
];

const MediaProof = () => (
  <section id="proof" className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-14">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-green-600" />
            <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">PROOF</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] text-balance">
            The brands we run<br />marketing for.
          </h2>
        </div>
        <Link
          to="/clients"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/30%)] pb-1 hover:border-green-600 hover:text-green-700 transition-colors"
        >
          See all work
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>

      <motion.div
        {...staggerParent(0.08)}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
      >
        {brands.map((brand) => (
          <motion.div
            key={brand.name}
            variants={staggerItem}
            className="group rounded-2xl border border-[rgb(var(--ink-rgb)/12%)] bg-[rgb(var(--ink-rgb)/2%)] aspect-[3/2] flex items-center justify-center p-6 overflow-hidden hover:border-green-600/40 hover:bg-[rgb(var(--ink-rgb)/4%)] transition-all duration-500"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="max-h-10 md:max-h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              style={brand.scale ? { transform: `scale(${brand.scale})` } : {}}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Words from clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 border-t border-[rgb(var(--ink-rgb)/12%)] mt-16 md:mt-20 pt-14 md:pt-16">
        {testimonials.map((t, i) => (
          <motion.div key={t.client} {...fadeUp(i * 0.1)} className="lg:col-span-4">
            <Quote size={26} className="text-green-600 mb-5" fill="currentColor" strokeWidth={0} />
            <p className="text-lg md:text-xl text-[var(--secondary)] font-medium leading-snug mb-7">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-600/10 border border-green-600/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-green-700">{t.client.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--secondary)]">{t.client}</p>
                <p className="text-[10px] font-mono text-[rgb(var(--ink-rgb)/40%)] tracking-widest">VERIFIED PARTNER</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div {...fadeUp(0.2)} className="lg:col-span-4 lg:border-l lg:border-[rgb(var(--ink-rgb)/12%)] lg:pl-14">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-7">
            {facts.map((f) => (
              <div key={f.label}>
                <p className="font-heading text-3xl md:text-4xl font-semibold text-[var(--secondary)] tabular-nums">
                  {f.value}
                </p>
                <p className="text-xs md:text-sm text-[rgb(var(--ink-rgb)/50%)] mt-1 leading-snug">{f.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MediaProof;
