import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  Globe, Code, Smartphone, Cpu, Zap, Megaphone,
  Layers, Cloud, ShoppingCart, Database, Share2,
  PenTool, Shield, Rocket, CheckCircle, Mail,
  Phone, MapPin, Github, Twitter, Linkedin, Menu, X, ArrowRight,
  ExternalLink, ChevronRight, Play, Sparkles, Activity, Command, Boxes, Blocks, BarChart, Search
} from 'lucide-react';

// --- Assets ---
import logo from './assets/logo.png';
import heroVideo from './assets/video.mp4';

// --- Client Logos ---
import client1 from './assets/Logos/3x_logo.png';
import client2 from './assets/Logos/Aurelian Logo.png';
import client3 from './assets/Logos/bibo_logo.jpg';
import client4 from './assets/Logos/bumblebee-logo.jpg';
import client5 from './assets/Logos/eyeluxe_logo.png';
import client6 from './assets/Logos/keralasoul_logo.png';
import client7 from './assets/Logos/trainifie_logo.png';

// --- Custom Icons ---
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

// --- Global UI Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;


const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = (mouseXPos / width - 0.5) * 20;
    const yPct = (mouseYPos / height - 0.5) * -20;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
      className={`glass-cinematic relative group p-8 rounded-[2.5rem] border border-white/5 hover:border-green-500/30 transition-all duration-500 shadow-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }} className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/[0.05] group-hover:to-transparent transition-all duration-700 rounded-[2.5rem]" />
      <div className="absolute inset-0 light-sweep-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" />
    </motion.div>
  );
};

// --- Page Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' },
  ];

  // Custom Animated Hamburger Icon
  const HamburgerIcon = ({ isOpen }) => (
    <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 relative">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="w-full h-[2px] bg-white rounded-full block origin-center transition-colors group-hover:bg-green-400"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        className="w-full h-[2px] bg-white rounded-full block transition-colors group-hover:bg-green-400"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="w-full h-[2px] bg-white rounded-full block origin-center transition-colors group-hover:bg-green-400"
      />
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled || mobileMenuOpen ? 'py-3 md:py-4 bg-black/80 backdrop-blur-3xl border-b border-white/10' : 'py-5 md:py-8 bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
        <motion.a
          href="#"
          className="flex items-center gap-3 md:gap-5 group"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 bg-green-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 glass-cinematic p-2 md:p-2.5 rounded-xl md:rounded-2xl border border-white/10 group-hover:border-green-500/40 transition-all duration-500 overflow-hidden shadow-2xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent -translate-x-[100%]"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <img src={logo} alt="Nexlifie Logo" className="h-8 sm:h-10 md:h-14 w-auto relative z-10 brightness-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-500" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500/50 rounded-tl-md group-hover:w-4 group-hover:h-4 transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500/50 rounded-br-md group-hover:w-4 group-hover:h-4 transition-all duration-500" />
            </motion.div>
          </div>
        </motion.a>

        <div className="hidden lg:flex items-center gap-8 xl:gap-14">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.22em] text-white hover:text-green-400 transition-all"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div className="h-8 w-[1px] bg-white/15 mx-2 xl:mx-4" />
          <motion.button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 xl:px-8 py-3 glass-cinematic border-green-500/40 text-green-400 text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-green-500 hover:text-black transition-all"
          >
            Launch System
          </motion.button>
        </div>

        <button
          className="lg:hidden text-white p-2 z-[150] relative group transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <HamburgerIcon isOpen={mobileMenuOpen} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#020202]/98 backdrop-blur-3xl z-[140] flex flex-col justify-center items-center lg:hidden"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 digital-grid-system opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-10 w-full px-10">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] font-mono text-green-500/40 tracking-[1em] uppercase mb-4"
              >
                Navigation // System
              </motion.span>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="text-5xl xs:text-6xl font-black uppercase tracking-tighter text-white hover:text-green-400 transition-all group relative"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-500"
                  />
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs mt-10"
              >
                <button
                  className="w-full py-6 bg-green-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_0_50px_rgba(0,255,136,0.2)] hover:shadow-[0_0_70px_rgba(0,255,136,0.4)] transition-all active:scale-95 relative overflow-hidden group"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10">Launch System</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-10 flex flex-col items-center gap-2"
              >
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">Protocol Integrated // 2026</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-500 shadow-[0_0_15px_#00ff88] origin-left z-20" style={{ scaleX }} />
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/30" />
        <div className="absolute inset-0 bg-green-500/10 opacity-30" />
      </div>

      {/* Grid, Particles & Light Streaks */}
      <div className="absolute inset-0 digital-grid-system mask-radial opacity-30 z-10 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent rotate-[15deg] blur-sm z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent rotate-[-15deg] blur-sm z-10" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-20 text-center">
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-9xl lg:text-[180px] xl:text-[220px] font-black leading-[1.1] md:leading-[0.8] tracking-tighter mb-8 md:mb-12 text-white font-heading relative inline-block break-words max-w-full">
            Nexlifie
            <div className="absolute -inset-10 md:-inset-20 bg-green-500/10 blur-[60px] md:blur-[140px] -z-10 rounded-full animate-pulse" />
          </h1>

          <p className="text-[10px] sm:text-xs md:text-2xl font-mono text-green-400 tracking-[0.3em] sm:tracking-[0.8em] uppercase flex justify-center items-center gap-3 sm:gap-6 mb-10 md:mb-16 neon-glow-text">
            Innovate <Sparkles className="w-3 h-3 sm:w-5 sm:h-5" /> Build <Activity className="w-3 h-3 sm:w-5 sm:h-5" /> Grow
          </p>

          <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-2xl text-white/50 mb-10 md:mb-20 font-light leading-relaxed tracking-wider px-4">
            We build modern websites, powerful applications, AI solutions, and automation systems for growing businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-10 justify-center items-center px-4 md:px-0">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 255, 136, 0.6)" }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-green-500 text-black font-black uppercase tracking-[0.4em] text-[10px] md:text-[13px] rounded-xl md:rounded-3xl relative group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/40 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, border: "1px solid #00ff88" }}
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 glass-cinematic border-white/10 text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-[13px] rounded-xl md:rounded-3xl flex items-center justify-center gap-5 group"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              View Services <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Tech Elements */}
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-[15%] w-64 h-64 glass-card-3d border-white/10 rounded-3xl opacity-20 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-[15%] w-48 h-48 glass-card-3d border-green-500/10 rounded-full opacity-10 hidden lg:block"
      />
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Globe />, title: "Website Development", text: "Stunning, high-performance websites tailored to your brand." },
    { icon: <Smartphone />, title: "Mobile App Development", text: "Native and cross-platform mobile experiences for iOS and Android." },
    { icon: <Code />, title: "Web Applications", text: "Complex, scalable web systems built with modern stacks." },
    { icon: <Layers />, title: "Custom Software", text: "Custom internal tools to power your operations." },
    { icon: <Cpu />, title: "AI Solutions", text: "Integrating machine learning and intelligence into your workflows." },
    { icon: <Cloud />, title: "Cloud Solutions", text: "Robust infrastructure design and deployment." },
    { icon: <PenTool />, title: "UI / UX Design", text: "User-centric interfaces that convert and delight." },
    { icon: <ShoppingCart />, title: "E-commerce", text: "Scalable online stores with seamless payment flows." },
    { icon: <Megaphone />, title: "Digital Marketing", text: "Growth-focused strategies to dominate your market." },
    { icon: <Search />, title: "SEO", text: "Optimizing your digital visibility for maximum reach." }
  ];

  return (
    <section id="services" className="py-24 md:py-32 lg:py-48 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          className="mb-12 md:mb-24 lg:mb-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-none uppercase">CORE <br /><span className="text-white/10">SERVICES</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
            >
              <TiltCard className="h-full bg-white/[0.02]">
                <div className="text-green-400 mb-10 p-6 w-fit rounded-2xl bg-white/5 border border-white/5 group-hover:bg-green-500 group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  {React.cloneElement(service.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black mb-6 tracking-tight uppercase group-hover:text-green-400 transition-colors duration-500">{service.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed font-mono uppercase tracking-[0.1em] mb-12">{service.text}</p>
                <div className="mt-auto border-t border-white/10 pt-8 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-black tracking-widest text-green-500">EXPLORE SCOPE</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 lg:py-48 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group perspective-[2000px]"
          >
            <div className="absolute -inset-10 md:-inset-20 bg-green-500/10 blur-[60px] md:blur-[180px] rounded-full" />
            <div className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 glass-cinematic p-2 shadow-3xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400"
                alt="Nexlifie Vision"
                className="rounded-[1.8rem] md:rounded-[3.8rem] transition-all duration-[1.5s] brightness-90 group-hover:brightness-100"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black mb-8 md:mb-14 tracking-tighter leading-[0.9] uppercase underline underline-offset-[10px] md:underline-offset-[20px] decoration-green-500/20">WE BUILD <br />SCALABLE <br /><span className="text-white/10">FUTURES.</span></h2>
            <div className="space-y-6 md:space-y-10 mb-10 md:mb-16">
              <p className="text-lg md:text-2xl text-white/40 font-light leading-relaxed tracking-wide max-w-2xl mx-auto lg:mx-0">
                Nexlifie is a modern software and digital solutions company focused on building innovative, scalable, and intelligent technology products for businesses around the world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-20 border-l-0 lg:border-l-2 border-green-500/30 pl-0 lg:pl-16 py-4">
              <div className="glass-cinematic p-6 rounded-2xl border-white/5 sm:bg-transparent sm:border-none sm:p-0">
                <h4 className="text-4xl md:text-7xl font-black text-green-500 neon-glow-text">150+</h4>
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/20 mt-2">Projects Delivered</p>
              </div>
              <div className="glass-cinematic p-6 rounded-2xl border-white/5 sm:bg-transparent sm:border-none sm:p-0">
                <h4 className="text-4xl md:text-7xl font-black text-white/20 leading-none uppercase">Global</h4>
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/20 mt-2">Scale</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      client: "Bumblebee",
      text: "NEXLIFIE delivered an excellent website and marketing system for our business. Their team is professional, fast, and highly skilled.",
      icon: <Zap size={30} className="text-green-500" />
    },
    {
      client: "Eyéluxe",
      text: "Excellent service, modern design, and strong technical support. Nexlifie is the right choice for any business looking to grow digitally.",
      icon: <Sparkles size={30} className="text-green-500" />
    }
  ];

  return (
    <section id="testimonials" className="py-48 relative bg-black/80">
      <div className="container mx-auto px-10">
        <motion.div
          className="text-center mb-24 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <span className="text-green-500 font-black tracking-[0.6em] md:tracking-[1em] text-[10px] md:text-[12px] uppercase mb-6 md:mb-8 block">Global Feedback Matrix</span>
          <h2 className="text-4xl sm:text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-none">CLIENT <span className="text-white/10">SUCCESS.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 max-w-6xl mx-auto px-4 md:px-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: i * 0.2 }}
              className="glass-cinematic p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl group transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full group-hover:bg-green-500/10 transition-all" />
              <div className="flex gap-2 text-green-500 mb-6 md:mb-10 group-hover:neon-glow-text">
                {[1, 2, 3, 4, 5].map(star => <Zap size={18} key={star} fill="currentColor" />)}
              </div>
              <p className="text-xl md:text-3xl text-white/60 italic mb-10 md:mb-14 font-light leading-relaxed tracking-wide">"{t.text}"</p>
              <div className="flex items-center gap-6 md:gap-8 border-t border-white/5 pt-8 md:pt-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-2xl border border-green-500/30 flex items-center justify-center group-hover:neon-border-glow transition-all">
                  {React.cloneElement(t.icon, { size: 24 })}
                </div>
                <div>
                  <h5 className="text-xl md:text-2xl font-black text-white hover:text-green-500 transition-colors uppercase tracking-tight">{t.client}</h5>
                  <p className="text-[10px] text-green-500 font-mono uppercase tracking-[0.3em] md:tracking-[0.4em] mt-1 md:mt-2 opacity-60">Verified Partner</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  const clients = [
    { name: "3X", logo: client1 },
    { name: "Aurelian", logo: client2, scale: 2.0 },
    { name: "Bibo", logo: client3 },
    { name: "Bumblebee", logo: client4 },
    { name: "Eyeluxe", logo: client5 },
    { name: "Kerala Soul", logo: client6 },
    { name: "Trainifie", logo: client7, scale: 2.2 }
  ];

  return (
    <section id="clients" className="py-24 md:py-32 lg:py-48 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          className="text-center mb-16 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-green-500 font-black tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-[12px] uppercase mb-4 md:mb-8 block">Network Partners</span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter uppercase leading-none">TRUSTED <span className="text-white/10">BY.</span></h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 md:gap-8 lg:gap-10 items-center justify-items-center">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              className="relative group w-full flex items-center justify-center aspect-square rounded-2xl bg-black border border-white/10 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-500 overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-cover"
                  style={client.scale ? { transform: `scale(${client.scale})` } : {}}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TypewriterText = ({ text, delay = 0, speed = 20, onComplete }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let timer;
    const startTypewriter = () => {
      timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    let delayTimer = setTimeout(startTypewriter, delay);
    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, delay, speed, onComplete]);

  return <span>{displayed}</span>;
};

const Contact = () => {
  const [step, setStep] = useState('IDLE'); // IDLE, ANALYZING, GENERATING, READY, SENDING, SUCCESS
  const [prompt, setPrompt] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [blueprint, setBlueprint] = useState(null);
  const scrollRef = useRef(null);

  const isValidPhone = leadPhone.replace(/\D/g, '').length >= 10;

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [step, blueprint, prompt]);

  const analyzePrompt = (text) => {
    const lower = text.toLowerCase();
    let type = "Custom Digital Platform";
    let stack = ["React", "Node.js", "PostgreSQL", "AWS"];
    let timeline = "2 Weeks";
    let focus = "Scalable Architecture";

    if (lower.includes("app") || lower.includes("mobile")) {
      type = "Mobile Application";
      stack = ["React Native", "Node.js", "Firebase", "GCP"];
      timeline = "2 Weeks";
      focus = "Cross-Platform Ecosystem";
    }
    if (lower.includes("ecommerce") || lower.includes("store") || lower.includes("shop")) {
      type = "E-Commerce System";
      stack = ["Next.js", "Stripe", "Supabase", "Vercel"];
      timeline = "2 Weeks";
      focus = "Conversion & Transactions";
    }
    if (lower.includes("ai") || lower.includes("machine") || lower.includes("bot")) {
      type = "AI-Integrated Platform";
      stack = ["React", "Python/FastAPI", "OpenAI / LLMs", "Vector DB"];
      timeline = "2 Weeks";
      focus = "Neural Processing & Automation";
    }

    return { type, stack, timeline, focus };
  };

  const handleInitialize = () => {
    if (!prompt.trim()) return;
    setStep('ANALYZING');

    setTimeout(() => {
      setStep('GENERATING');
      setBlueprint(analyzePrompt(prompt));
      setTimeout(() => setStep('READY'), 3000);
    }, 2000);
  };

  const handleSubmitToEngineering = async (contactInfo) => {
    setStep('SENDING');

    const formData = new FormData();
    formData.append('email', 'lead_from_ai_architect@nexlifie.com'); // Formspree requirement
    formData.append('phone', contactInfo);
    formData.append('message', `PHONE: ${contactInfo}\n\nPROMPT:\n${prompt}\n\nBLUEPRINT:\nType: ${blueprint.type}\nFocus: ${blueprint.focus}\nStack: ${blueprint.stack.join(', ')}`);

    try {
      await fetch("https://formspree.io/f/xykljnyo", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      setStep('SUCCESS');
    } catch {
      setStep('SUCCESS');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-500/5 blur-[100px] md:blur-[180px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Strategic Copy */}
          <div className="relative text-center lg:text-left">
            <span className="text-green-500 font-black tracking-[0.5em] md:tracking-[0.8em] text-[10px] md:text-[12px] uppercase mb-6 block">Nexlifie AI Architect</span>
            <h2 className="text-4xl sm:text-6xl md:text-[80px] lg:text-[100px] font-black mb-8 md:mb-12 tracking-tighter leading-[0.9] uppercase">
              ENGINEER <br /><span className="text-white/10">THE FUTURE.</span>
            </h2>

            <p className="text-base md:text-xl text-white/50 font-light leading-relaxed tracking-wide max-w-lg mx-auto lg:mx-0 mb-10">
              Skip the standard form. Describe your vision to our AI Architect below. It will analyze your requirements and instantly generate a strategic engineering blueprint.
            </p>

            <div className="space-y-6 md:space-y-8 glass-cinematic p-6 md:p-8 rounded-3xl border-white/5 inline-block text-left w-full max-w-lg shadow-[0_0_50px_rgba(34,197,94,0.05)]">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] font-mono block mb-1">Direct Channel</span>
                  <p className="text-lg font-bold text-white tracking-tight">nexlifie@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] font-mono block mb-1">Line Secure</span>
                  <p className="text-lg font-bold text-white tracking-tight">+91 9591522856</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                  <Command size={20} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] font-mono block mb-1">System Status</span>
                  <p className="text-lg font-bold text-green-500 tracking-tight flex items-center gap-2">Online <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span></p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Side: AI Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-cinematic rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px] md:h-[650px] relative bg-[#050505]/95 backdrop-blur-3xl"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 px-6 py-4 flex items-center gap-4 border-b border-white/5 shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[10px] font-mono text-white/40 tracking-widest ml-4">nexlifie-ai-architect-v2.1</span>
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 p-6 md:p-8 overflow-y-auto font-mono text-sm md:text-base space-y-6 scroll-smooth">

              <div className="flex items-start gap-4">
                <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                <p className="text-white/80 leading-relaxed">Hey, How can we help you?</p>
              </div>

              {/* User Input State */}
              {(step === 'IDLE' || prompt) && (
                <div className="flex items-start gap-4 w-full">
                  <span className="text-blue-400 w-24 shrink-0 select-none">YOU{'>'}</span>
                  {step === 'IDLE' ? (
                    <div className="w-full relative group">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., We need a cross-platform mobile app for booking Reservation services with an AI styling assistant..."
                        className="w-full bg-transparent border-none outline-none text-white/90 placeholder:text-white/20 resize-none min-h-[100px] focus:ring-0 p-0 shadow-none focus:outline-none"
                        style={{ boxShadow: 'none' }}
                      />
                      <div className="absolute -inset-2 bg-green-500/5 blur-xl -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    </div>
                  ) : (
                    <p className="text-white/60 whitespace-pre-wrap">{prompt}</p>
                  )}
                </div>
              )}

              {/* Analyzing State */}
              {step !== 'IDLE' && (
                <div className="flex items-start gap-4">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <TypewriterText text="Analyzing your requirements..." speed={10} />
                    {step === 'ANALYZING' && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-4 bg-green-500 ml-1 translate-y-1"></motion.span>}
                  </div>
                </div>
              )}

              {/* Generating Blueprint */}
              {(step === 'GENERATING' || step === 'READY' || step === 'SENDING' || step === 'SUCCESS') && blueprint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 transition-opacity duration-1000">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="w-full">
                    <p className="text-green-400 mb-4 font-bold border-b border-green-500/20 pb-2 inline-block">-- BLUEPRINT GENERATED --</p>
                    <div className="space-y-3 mb-6 bg-green-500/5 p-4 md:p-6 rounded-xl border border-green-500/20 w-full text-white/80 shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                      <p><span className="text-white/40 uppercase tracking-wider text-[10px] w-24 inline-block">Type:</span> <span className="text-white">{blueprint.type}</span></p>
                      <p><span className="text-white/40 uppercase tracking-wider text-[10px] w-24 inline-block">Focus:</span> <span className="text-green-400">{blueprint.focus}</span></p>
                      <div className="flex gap-2">
                        <span className="text-white/40 uppercase tracking-wider text-[10px] w-24 shrink-0 mt-1">Stack:</span>
                        <div className="flex flex-wrap gap-2">
                          {blueprint.stack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-xs text-white/90">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'SENDING' && (
                <div className="flex items-start gap-4">
                  <span className="text-yellow-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <TypewriterText text="Encrypting payload and transmitting to Nexlifie Engineering..." speed={30} />
                  </div>
                </div>
              )}

              {step === 'SUCCESS' && (
                <div className="flex items-start gap-4">
                  <span className="text-green-500 w-24 shrink-0 select-none">NEXLIFIE{'>'}</span>
                  <div className="text-white/80">
                    <p className="text-green-400 font-bold mb-2">Transmission successful. Mission Logged.</p>
                    <TypewriterText text="Our lead engineer will review this blueprint and contact you shortly. Terminating session." speed={20} />
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Actions / Footer */}
            <div className="bg-white/[0.02] p-4 md:p-6 border-t border-white/5 shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] md:text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  {step === 'IDLE' ? 'System Ready' : step === 'SUCCESS' ? 'Session Complete' : 'Processing...'}
                </span>
              </div>

              {step === 'IDLE' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInitialize}
                  className={`bg-green-500 text-black px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${!prompt.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'}`}
                >
                  Send <Rocket size={14} />
                </motion.button>
              )}

              {step === 'READY' && (
                <div className="flex w-full md:w-auto flex-col md:flex-row gap-3 items-center">
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <Phone size={14} className={leadPhone.length > 0 ? (isValidPhone ? "text-green-500" : "text-red-500") : "text-white/40"} />
                    </div>
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      className={`bg-white/5 backdrop-blur-md border rounded-xl pl-10 pr-4 py-3 text-[10px] md:text-xs text-white font-mono tracking-widest outline-none w-full transition-all focus:bg-white/10 ${leadPhone.length > 0 && !isValidPhone ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/20 focus:border-green-500/80 focus:shadow-[0_0_20px_rgba(34,197,94,0.2)]'}`}
                    />
                    {leadPhone.length > 0 && !isValidPhone && (
                      <span className="absolute -bottom-5 left-2 text-[9px] text-red-500 animate-pulse font-mono tracking-widest uppercase">Minimum 10 Digits</span>
                    )}
                  </div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    whileHover={isValidPhone ? { scale: 1.05 } : {}}
                    whileTap={isValidPhone ? { scale: 0.95 } : {}}
                    disabled={!isValidPhone}
                    onClick={() => handleSubmitToEngineering(leadPhone)}
                    className={`px-4 md:px-8 py-3 rounded-xl font-black text-[10px] md:text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all ${isValidPhone ? 'bg-green-500 text-black hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed'}`}
                  >
                    Send <Rocket size={14} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Cinematic Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent shadow-[0_0_15px_#00ff88]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-48 border-t border-white/5 relative z-10 bg-[#020202]">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent opacity-40" />
      <div className="container mx-auto px-10 text-center">
        <motion.div
          className="flex flex-col items-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-6xl font-black uppercase tracking-[0.6em] mb-6 font-heading">NEXLIFIE</h2>
          <p className="text-[16px] font-mono font-black text-green-500/60 uppercase tracking-[1em]">Innovate | Build | Grow</p>
        </motion.div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto mb-32 border-y border-white/5 py-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 font-mono">Direct Channel</span>
            <p className="text-xl font-bold hover:text-green-400 transition-colors">nexlifie@gmail.com</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 font-mono">Digital Domain</span>
            <p className="text-xl font-bold hover:text-green-400 transition-colors">nexlifie.com</p>
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 opacity-30 px-10">
          {/* <div className="flex flex-col gap-4 text-left">
            <p className="text-[11px] font-mono tracking-widest uppercase">Kernel Protocol // Node Synchronized</p>
            <p className="text-[11px] font-black uppercase tracking-widest">© 2026 Nexlifie. Elite Engineering Group.</p>
          </div> */}
          {/* <div className="flex gap-16 text-[11px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-[#020202] text-white selection:bg-green-500/40 selection:text-green-400 min-h-screen relative overflow-hidden">
      <NoiseOverlay />

      {/* Cinematic Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 digital-grid-system mask-fade-in" />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Services />

        {/* Technology Matrix Section */}
        <section className="py-48 relative overflow-hidden bg-black/40">
          <div className="container mx-auto px-10">
            <div className="text-center mb-24 md:mb-32">
              <h2 className="text-4xl sm:text-6xl md:text-9xl font-black mb-6 md:mb-8 tracking-tighter uppercase">AI <span className="text-green-500 neon-glow-text">DASHBOARD</span></h2>
              <p className="text-[10px] md:text-[14px] font-black uppercase tracking-[0.6em] md:tracking-[1em] text-white/30">Technology Integration Interface</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-7xl mx-auto px-4 md:px-0">
              {["React", "Next.js", "Node.js", "Python", "OpenAI", "TensorFlow", "AWS", "Docker", "MongoDB", "TypeScript", "Kotlin", "Swift", "Flutter"].map((tech, i) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 136, 0.1)', borderColor: '#00ff88' }}
                  className="px-8 md:px-12 py-3 md:py-5 glass-cinematic border border-white/10 rounded-xl md:rounded-2xl font-mono text-[10px] md:text-sm tracking-widest uppercase transition-all duration-500 cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Clients />
        <Testimonials />

        {/* Global Features Section (Level 7) */}
        <section className="py-48 relative">
          <div className="container mx-auto px-10">
            <div className="text-center mb-16 md:mb-40">
              <h2 className="text-4xl sm:text-6xl md:text-9xl lg:text-[140px] font-black tracking-tighter mb-6 md:mb-8 text-white uppercase leading-[1.1] md:leading-none"><span className="text-white/10 text-glow">WHY</span> NEXLIFIE?</h2>
              <div className="w-20 md:w-60 h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 px-6 md:px-0">
              {[
                { title: "Elite Design", icon: <Boxes />, code: "UI/UX" },
                { title: "AI Integrated", icon: <Activity />, code: "AI TECH" },
                { title: "High Speed", icon: <Cloud />, code: "CL0UD" },
                { title: "Max Security", icon: <Shield />, code: "SECURE" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="p-10 md:p-16 glass-cinematic border-white/5 text-center group transition-all duration-500 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden relative"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                  <div className="text-green-500 mb-8 md:mb-10 flex justify-center group-hover:scale-125 transition-transform duration-700">
                    {React.cloneElement(feature.icon, { size: 32 })}
                  </div>
                  <p className="text-[10px] font-mono text-white/20 mb-4 md:mb-6 tracking-widest">{feature.code}</p>
                  <h4 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tighter mb-4 md:mb-6 group-hover:text-green-400 transition-colors">{feature.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919591522856?text=Hi%20Nexlifie!%20I%20am%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] transition-shadow text-black group"
      >
        <div className="absolute -inset-2 bg-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <WhatsAppIcon size={32} className="relative z-10" />
      </motion.a>
    </div>
  );
}

export default App;
