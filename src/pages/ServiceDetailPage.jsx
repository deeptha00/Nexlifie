import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Zap, Star, ChevronDown } from 'lucide-react';
import servicesData from '../data/servicesData';
import Navbar from '../components/Navbar';

/* ─── Animated Counter ─────────────────────────────── */
const AnimCounter = ({ value }) => {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !ran.current) {
        ran.current = true;
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) { setDisplay(value); return; }
        const suffix = value.replace(/[0-9]/g, '');
        let start = 0;
        const step = num / 40;
        const t = setInterval(() => {
          start += step;
          if (start >= num) { setDisplay(value); clearInterval(t); return; }
          setDisplay(`${Math.floor(start)}${suffix}`);
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
};

/* ─── Features Section (self-contained, auto-advance) ─ */
const FeatureSection = ({ service }) => {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const total = service.features.length;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total);
    }, 3500);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleClick = (i) => {
    setActive(i);
    startTimer(); // reset timer on manual click
  };

  return (
    <section className="py-24 md:py-32 bg-[#030303] relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-green-500" />
          <span className="text-[10px] font-mono text-green-500 tracking-[0.4em] uppercase">What You Get</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-14">
          Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Included.</span>
        </h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Feature list */}
          <div className="flex flex-col">
            {service.features.map((f, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  className="text-left py-6 border-b border-white/[0.07] focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    {/* Progress bar left */}
                    <div className="relative w-[3px] self-stretch rounded-full bg-white/5 shrink-0">
                      <div
                        className="absolute top-0 left-0 w-full rounded-full bg-green-500"
                        style={{
                          height: isActive ? '100%' : '0%',
                          transition: isActive ? 'height 3.5s linear' : 'height 0.2s ease',
                          boxShadow: isActive ? '0 0 8px rgba(34,197,94,0.6)' : 'none',
                        }}
                      />
                    </div>

                    {/* Number */}
                    <div
                      className="w-9 h-9 rounded-full border shrink-0 flex items-center justify-center text-[11px] font-black font-mono"
                      style={{
                        background: isActive ? '#22c55e' : 'transparent',
                        borderColor: isActive ? '#22c55e' : 'rgba(255,255,255,0.12)',
                        color: isActive ? '#000' : 'rgba(255,255,255,0.3)',
                        boxShadow: isActive ? '0 0 16px rgba(34,197,94,0.5)' : 'none',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Title & desc */}
                    <div className="flex-1">
                      <div
                        className="text-base md:text-lg font-bold"
                        style={{
                          color: isActive ? '#4ade80' : 'rgba(255,255,255,0.65)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          maxHeight: isActive ? '100px' : '0px',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'max-height 0.4s ease, opacity 0.3s ease',
                        }}
                      >
                        <p className="text-white/45 text-sm leading-relaxed mt-2">
                          {f.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      style={{
                        color: isActive ? '#22c55e' : 'rgba(255,255,255,0.12)',
                        flexShrink: 0,
                        transition: 'color 0.3s ease',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — Live image preview */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/8 shadow-2xl flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={service.image}
                  alt={service.features[active]?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent pointer-events-none" />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4"
                  >
                    <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-1">
                      Feature {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-bold text-white">{service.features[active]?.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2">
              {service.features.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? '24px' : '6px',
                    height: '6px',
                    background: active === i ? '#22c55e' : 'rgba(255,255,255,0.15)',
                    boxShadow: active === i ? '0 0 10px rgba(34,197,94,0.5)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Parallax Hook ─────────────────────────────────── */
const useParallax = (v, d) => useTransform(v, [0, 1], [-d, d]);

/* ─── Main Page ─────────────────────────────────────── */
const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroBgY = useParallax(smoothProgress, 80);
  const heroTextY = useParallax(smoothProgress, -40);

  const service = servicesData.find((s) => s.slug === slug);
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/30 font-mono text-xs mb-4 tracking-widest">SERVICE_NOT_FOUND</p>
        <button onClick={() => navigate(-1)} className="text-green-400 font-mono text-sm">← Go Back</button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-white overflow-x-hidden">
      <Navbar />

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-600 z-[200] origin-left shadow-[0_0_10px_rgba(34,197,94,0.8)]"
        style={{ scaleX: smoothProgress }}
      />

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">

        {/* Ken Burns BG */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        >
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-[#020202]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/90 via-[#020202]/30 to-transparent" />
        </motion.div>

        {/* Floating image panels (desktop only) */}
        <div className="absolute inset-0 z-[1] pointer-events-none hidden md:block">
          {/* Panel 1 */}
          <motion.div
            className="absolute top-16 right-[6%] w-[260px] h-[360px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: -40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={service.image} alt="" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020202]/60" />
              <div className="absolute inset-0 border border-green-500/20 rounded-[2rem]" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,1)]" />
                <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest">Live</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Panel 2 */}
          <motion.div
            className="absolute top-[45%] right-[22%] w-[180px] h-[230px] rounded-[1.5rem] overflow-hidden border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <img src={service.image} alt="" className="w-full h-full object-cover scale-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/70 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Panel 3 */}
          <motion.div
            className="absolute bottom-[28%] right-[8%] w-[130px] h-[170px] rounded-[1.2rem] overflow-hidden border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <img src={service.image} alt="" className="w-full h-full object-cover scale-150" />
              <div className="absolute inset-0 bg-[#020202]/50" />
            </motion.div>
          </motion.div>

          {/* Panel 4 */}
          <motion.div
            className="absolute bottom-[8%] right-[18%] w-[220px] h-[130px] rounded-[1.5rem] overflow-hidden border border-green-500/15 shadow-[0_10px_40px_rgba(34,197,94,0.1)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src={service.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/60 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Dots */}
          <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[55%] right-[14%] w-1 h-1 rounded-full bg-green-400" />
          <div className="absolute top-[38%] right-[28%] w-2 h-2 rounded-full border border-green-500/50" />
          <div className="absolute top-[30%] right-[32%] w-1.5 h-1.5 rounded-full bg-green-500/30" />
        </div>

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/60 to-transparent z-[2] pointer-events-none"
          initial={{ top: '0%' }}
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <div className="absolute inset-0 digital-grid-system opacity-[0.05] z-[1] pointer-events-none" />

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-28 left-4 sm:left-6 md:left-16 z-20"
        >
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1 }}
          className="absolute top-28 right-4 sm:right-8 md:right-16 z-20 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">Service Active</span>
          <span className="text-[10px] font-mono text-white/30">
            {String(currentIndex + 1).padStart(2, '0')}/{String(servicesData.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Hero text */}
        <motion.div style={{ y: heroTextY }} className="relative z-10 w-full pb-16 px-4 sm:px-6 md:px-16 max-w-[55%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1px] bg-green-500" />
            <span className="text-[10px] font-mono text-green-500 tracking-[0.4em] uppercase">
              Nexlifie — Service {String(currentIndex + 1).padStart(2, '0')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(40px,5.5vw,100px)] font-black tracking-tighter leading-[0.88] uppercase mb-4"
          >
            {service.title}
          </motion.h1>

          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-white/50 font-light italic"
            >
              "{service.tagline}"
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-8 md:gap-14"
          >
            {[service.stat1, service.stat2, service.stat3].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-black text-green-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                  <AnimCounter value={stat.value} />
                </span>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[9px] font-mono uppercase tracking-widest text-white">Scroll</span>
          <ChevronDown size={16} className="text-white" />
        </motion.div>
      </section>

      {/* ═══ OVERVIEW ══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.7)] border border-white/8">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-8 -right-6 md:-right-12 bg-[#0a0a0a] border border-green-500/30 backdrop-blur-xl p-6 rounded-3xl shadow-[0_0_60px_rgba(34,197,94,0.2)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                  <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Live & Active</span>
                </div>
                <div className="text-3xl font-black text-white">{service.stat1.value}</div>
                <div className="text-[10px] text-white/40 font-mono mt-1">{service.stat1.label}</div>
              </motion.div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-green-500/40 rounded-tl-2xl" />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-8 h-[1px] bg-green-500" />
                <span className="text-[10px] font-mono text-green-500 tracking-[0.4em] uppercase">About This Service</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8"
              >
                The standard you<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">deserve.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-white/55 leading-[1.9] font-light mb-10 max-w-lg"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {[service.stat1, service.stat2, service.stat3].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.04] border border-white/8 px-4 py-2 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-sm font-bold text-green-400">{stat.value}</span>
                    <span className="text-xs text-white/30 font-mono">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES (auto-advance) ═══════════════════════ */}
      <FeatureSection service={service} />

      {/* ═══ PROCESS ═══════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute right-0 top-0 w-[700px] h-[700px] bg-green-500/4 blur-[180px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-green-500" />
                <span className="text-[10px] font-mono text-green-500 tracking-[0.4em] uppercase">Our Method</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Process</span>
              </h2>
            </div>
            <p className="text-white/30 text-sm font-mono max-w-xs leading-relaxed">
              A battle-tested, 5-phase methodology refined across hundreds of projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.12 }}
                className="relative group"
              >
                <div className="relative bg-[#050505] border border-white/[0.06] rounded-[2.5rem] p-8 md:p-10 overflow-hidden hover:border-green-500/30 transition-all duration-700 h-full flex flex-col shadow-xl">
                  <div className="absolute -top-6 -right-4 text-[100px] md:text-[130px] font-black text-white/[0.025] leading-none select-none pointer-events-none group-hover:text-green-500/[0.06] transition-colors duration-700">
                    {step.step}
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,197,94,0.07),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-green-500/50 transition-colors duration-700" />

                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-500">
                      <Zap size={14} className="text-green-500 group-hover:text-black transition-colors duration-500" />
                    </div>
                    <span className="text-[10px] font-mono text-green-500/60 uppercase tracking-widest">Phase {step.step}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-4 relative z-10 group-hover:text-green-400 transition-colors duration-500 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed relative z-10 group-hover:text-white/60 transition-colors duration-500 mt-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.4 }}
            >
              <Link to="/contact" className="block h-full">
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2.5rem] p-8 md:p-10 overflow-hidden h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(34,197,94,0.25)] hover:shadow-[0_30px_80px_rgba(34,197,94,0.4)] transition-shadow duration-500 cursor-pointer group min-h-[200px]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <Star size={24} className="text-black/30 mb-auto" />
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">Ready?</h3>
                    <p className="text-black/60 text-sm mb-6">Let's start your project today.</p>
                    <div className="inline-flex items-center gap-2 bg-black text-green-400 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest">
                      {service.cta} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════════ */}
      <section className="relative py-36 md:py-48 overflow-hidden bg-[#030303]">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-0 z-0">
          <img src={service.image} alt="" className="w-full h-full object-cover opacity-10 blur-sm scale-110" />
          <div className="absolute inset-0 bg-[#030303]/80" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.15)_0%,_transparent_65%)] z-0" />
        <div className="absolute inset-0 digital-grid-system opacity-[0.04] z-0" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-16 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-16 h-[1px] bg-green-500/60" />
              <span className="text-[10px] font-mono text-green-500 tracking-[0.4em] uppercase">Begin Now</span>
              <div className="w-16 h-[1px] bg-green-500/60" />
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-tight mb-6 drop-shadow-2xl">
              Let's build<br />something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600">
                extraordinary.
              </span>
            </h2>

            <p className="text-white/30 text-base md:text-lg max-w-md mx-auto mb-14 font-light">
              No templates. No shortcuts. Just exceptional work, delivered with precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 80px rgba(34,197,94,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-4 bg-green-500 text-black px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm overflow-hidden group shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                >
                  <span className="relative z-10">{service.cta}</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </Link>
              <Link to="/#services">
                <button className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest">
                  View all services <ArrowUpRight size={14} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PREV / NEXT ═══════════════════════════════════ */}
      <div className="border-t border-white/[0.06] bg-[#020202]">
        <div className="container mx-auto px-4 sm:px-6 md:px-16 max-w-7xl">
          <div className="grid grid-cols-2">
            <Link
              to={`/services/${prevService.slug}`}
              className="py-12 md:py-16 pr-8 border-r border-white/[0.06] flex flex-col gap-3 hover:bg-white/[0.02] transition-colors group"
            >
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest flex items-center gap-2">
                <ArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform" /> Previous Service
              </span>
              <span className="text-base md:text-xl font-black uppercase tracking-tight text-white/60 group-hover:text-green-400 transition-colors">
                {prevService.title}
              </span>
            </Link>
            <Link
              to={`/services/${nextService.slug}`}
              className="py-12 md:py-16 pl-8 flex flex-col gap-3 items-end text-right hover:bg-white/[0.02] transition-colors group"
            >
              <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest flex items-center gap-2">
                Next Service <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-base md:text-xl font-black uppercase tracking-tight text-white/60 group-hover:text-green-400 transition-colors">
                {nextService.title}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
