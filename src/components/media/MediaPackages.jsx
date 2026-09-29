import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { packages } from '../../data/mediaOffer';

const Card = ({ pkg }) => (
  <motion.div
    variants={staggerItem}
    className={`relative flex flex-col rounded-3xl p-7 md:p-9 transition-transform duration-500 hover:-translate-y-1 ${
      pkg.popular
        ? 'bg-white/[0.06] border border-green-500/40 shadow-[0_20px_60px_-20px_rgba(0,255,136,0.25)] lg:-mt-4 lg:mb-4'
        : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
    }`}
  >
    {pkg.popular && (
      <span className="absolute -top-3 left-7 md:left-9 bg-green-500 text-[#111111] text-[10px] font-bold font-mono tracking-[0.2em] px-3 py-1.5 rounded-full">
        MOST CHOSEN
      </span>
    )}

    <div className="mb-6">
      <div className="flex items-baseline gap-2.5 mb-2">
        <h3 className="font-heading text-2xl md:text-[28px] font-semibold tracking-tight">{pkg.name}</h3>
        <span className="text-[11px] font-mono tracking-[0.2em] text-green-500 uppercase">{pkg.tagline}</span>
      </div>
      <p className="text-sm text-white/45 leading-relaxed">{pkg.bestFor}</p>
    </div>

    <div className="pb-6 mb-6 border-b border-white/10">
      {pkg.price ? (
        <p className="font-heading text-3xl md:text-4xl font-semibold">
          {pkg.price}
          <span className="text-sm font-normal text-white/40"> + ad spend</span>
        </p>
      ) : (
        <p className="text-sm text-white/60">
          Priced to your scope
          <span className="block text-[11px] text-white/30 mt-1">Monthly retainer, agreed up front.</span>
        </p>
      )}
    </div>

    <ul className="space-y-3 mb-9 flex-1">
      {pkg.includes.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
          <Check size={15} className="text-green-500 shrink-0 mt-[3px]" strokeWidth={3} />
          {item}
        </li>
      ))}
    </ul>

    <Link
      to="/contact"
      className={`group inline-flex items-center justify-between gap-3 w-full rounded-2xl px-5 py-4 text-sm font-semibold transition-colors ${
        pkg.popular
          ? 'bg-green-500 text-[#111111] hover:bg-green-400'
          : 'border border-white/15 text-white hover:bg-white/[0.06] hover:border-white/30'
      }`}
    >
      Request pricing
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const MediaPackages = () => (
  <section id="packages" className="bg-[#111111] text-[#F7F8F6] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-500" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/40">HOW WE PACKAGE IT</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight mb-6 text-balance">
          Pick where you are today.
        </h2>
        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl">
          Whatever came out of the stack you just built above, it lands in one of these three.
          Start where your business is today and move up when the results justify it.
        </p>
      </motion.div>

      <motion.div {...staggerParent(0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {packages.map((pkg) => (
          <Card key={pkg.name} pkg={pkg} />
        ))}
      </motion.div>

      <motion.p {...fadeUp(0.1, 16)} className="text-sm text-white/40 mt-10 max-w-2xl">
        Need something that is not on this list — a one-off campaign, a launch, a rebrand?{' '}
        <Link to="/contact" className="text-green-500 hover:text-green-400 border-b border-green-500/40 transition-colors">
          Tell us the goal
        </Link>{' '}
        and we will scope it around that instead.
      </motion.p>
    </div>
  </section>
);

export default MediaPackages;
