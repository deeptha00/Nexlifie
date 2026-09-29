import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import servicesData from '../data/servicesData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ChatbotWidget from '../components/chatbot/ChatbotWidget';
import PageHead from '../components/PageHead';
import { staggerParent, staggerItem } from '../lib/motion';
import { breadcrumbList } from '../lib/seo';

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
      setActive((prev) => (prev + 1) % total);
    }, 3500);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleClick = (i) => {
    setActive(i);
    startTimer();
  };

  return (
    <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">WHAT YOU GET</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold tracking-tight text-[var(--secondary)] mb-14 text-balance">
          Everything included.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col">
            {service.features.map((f, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  className="text-left py-6 border-b border-[rgb(var(--ink-rgb)/10%)] focus:outline-none"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative w-[3px] self-stretch rounded-full bg-[rgb(var(--ink-rgb)/8%)] shrink-0">
                      <div
                        className="absolute top-0 left-0 w-full rounded-full bg-green-600"
                        style={{
                          height: isActive ? '100%' : '0%',
                          transition: isActive ? 'height 3.5s linear' : 'height 0.2s ease',
                        }}
                      />
                    </div>

                    <div
                      className="w-9 h-9 rounded-full border shrink-0 flex items-center justify-center text-[11px] font-black font-mono"
                      style={{
                        background: isActive ? '#16a34a' : 'transparent',
                        borderColor: isActive ? '#16a34a' : 'rgb(var(--ink-rgb) / 15%)',
                        color: isActive ? '#fff' : 'rgb(var(--ink-rgb) / 35%)',
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="flex-1">
                      <div
                        className="text-base md:text-lg font-bold transition-colors duration-300"
                        style={{ color: isActive ? '#15803d' : 'rgb(var(--ink-rgb) / 65%)' }}
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
                        <p className="text-[rgb(var(--muted-rgb))] text-sm leading-relaxed mt-2">{f.desc}</p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      style={{ color: isActive ? '#16a34a' : 'rgb(var(--ink-rgb) / 15%)', flexShrink: 0, transition: 'color 0.3s ease' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-[rgb(var(--ink-rgb)/10%)] shadow-[var(--shadow-soft)] flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={service.image}
                  alt={service.features[active]?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-[10px] font-mono text-green-400 tracking-widest mb-1">
                      Feature {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-bold text-white">{service.features[active]?.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {service.features.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleClick(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: active === i ? '24px' : '6px', height: '6px', background: active === i ? '#16a34a' : 'rgb(var(--ink-rgb) / 15%)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Main Page ─────────────────────────────────────── */
const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const service = servicesData.find((s) => s.slug === slug);
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return (
    <div className="min-h-screen bg-[var(--bg-dark)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[rgb(var(--muted-rgb))] font-mono text-xs mb-4 tracking-widest">SERVICE_NOT_FOUND</p>
        <button onClick={() => navigate(-1)} className="text-green-600 font-mono text-sm">← Go Back</button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-[var(--bg-dark)] text-[var(--secondary)] min-h-screen">
      <PageHead
        title={`${service.title} — Nexlifie`}
        description={service.description}
        canonical={`/services/${service.slug}`}
        ogImage={service.image}
        structuredData={[
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Development', path: '/development' },
            { name: service.title },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: 'Nexlifie',
              url: 'https://nexlifie.com',
            },
          },
        ]}
      />
      <Navbar />

      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-green-600 z-[200] origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* ═══ HERO ══════════════════════════════════════════ */}
      <section className="pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-[rgb(var(--muted-rgb))] hover:text-[var(--secondary)] transition-colors text-xs font-mono tracking-widest mb-10"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-6 h-[1px] bg-green-600" />
                <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">
                  NEXLIFIE — SERVICE {String(currentIndex + 1).padStart(2, '0')}/{String(servicesData.length).padStart(2, '0')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4 text-balance"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg md:text-xl text-green-700 font-medium italic mb-6"
              >
                "{service.tagline}"
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base text-[rgb(var(--muted-rgb))] leading-relaxed max-w-lg mb-8"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-black transition-colors"
                  >
                    {service.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="group relative rounded-2xl overflow-hidden border border-[rgb(var(--ink-rgb)/10%)] shadow-[var(--shadow-soft)] aspect-[4/3]">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <motion.div
                {...staggerParent(0.08, 0.1)}
                className="grid grid-cols-3 border-t border-l border-[rgb(var(--ink-rgb)/12%)] mt-0"
              >
                {[service.stat1, service.stat2, service.stat3].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="border-r border-b border-[rgb(var(--ink-rgb)/12%)] p-4 hover:bg-[rgb(var(--ink-rgb)/1.5%)] transition-colors duration-500"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">
                      <AnimCounter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-mono text-[rgb(var(--muted-rgb))] tracking-widest mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES (auto-advance) ═══════════════════════ */}
      <FeatureSection service={service} />

      {/* ═══ PROCESS ═══════════════════════════════════════ */}
      <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[1px] bg-green-600" />
                <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">OUR METHOD</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold tracking-tight text-[var(--secondary)] text-balance">
                The process.
              </h2>
            </div>
            <p className="text-[rgb(var(--muted-rgb))] text-sm max-w-xs leading-relaxed">
              A battle-tested methodology refined across hundreds of projects.
            </p>
          </div>

          <motion.div {...staggerParent(0.08, 0.1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="border-t border-[rgb(var(--ink-rgb)/12%)] pt-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-green-600 tracking-widest">{step.step}</span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-[var(--secondary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[rgb(var(--muted-rgb))] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}

            <motion.div variants={staggerItem} className="border-t border-[rgb(var(--ink-rgb)/12%)] pt-6">
              <Link to="/contact" className="block h-full group">
                <div className="flex items-center gap-2 mb-4 text-green-600">
                  <Zap size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-mono text-xs tracking-widest">READY?</span>
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-[var(--secondary)] mb-3 group-hover:text-green-700 transition-colors">
                  Let's start your project.
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/30%)] pb-1 group-hover:border-green-600 transition-colors">
                  {service.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════════ */}
      <section className="bg-[#111111] text-white py-24 md:py-32">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-balance">
              Let's build something<br /><span className="text-green-500">extraordinary.</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg max-w-md mb-10 font-light">
              No templates. No shortcuts. Just exceptional work, delivered with precision.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-green-500 text-[#111111] px-7 py-4 rounded-2xl font-semibold text-sm hover:bg-green-400 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300"
              >
                {service.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/#services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/30 pb-1 hover:border-green-500 hover:text-green-400 transition-colors"
              >
                View all services <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PREV / NEXT ═══════════════════════════════════ */}
      <div className="bg-[#111111] border-t border-white/10">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10">
          <div className="grid grid-cols-2">
            <Link
              to={`/services/${prevService.slug}`}
              className="py-10 md:py-12 pr-8 border-r border-white/10 flex flex-col gap-3 hover:bg-white/[0.03] transition-colors duration-300 group"
            >
              <span className="text-[10px] font-mono text-white/30 tracking-widest flex items-center gap-2 group-hover:text-green-400 transition-colors">
                <ArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform" /> Previous
              </span>
              <span className="font-heading text-base md:text-xl font-bold tracking-tight text-white/70 group-hover:text-green-400 transition-colors">
                {prevService.title}
              </span>
            </Link>
            <Link
              to={`/services/${nextService.slug}`}
              className="py-10 md:py-12 pl-8 flex flex-col gap-3 items-end text-right hover:bg-white/[0.03] transition-colors duration-300 group"
            >
              <span className="text-[10px] font-mono text-white/30 tracking-widest flex items-center gap-2 group-hover:text-green-400 transition-colors">
                Next <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-heading text-base md:text-xl font-bold tracking-tight text-white/70 group-hover:text-green-400 transition-colors">
                {nextService.title}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <ChatbotWidget />
    </div>
  );
};

export default ServiceDetailPage;
