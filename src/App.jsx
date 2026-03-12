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

// --- Global UI Components ---

const NoiseOverlay = () => <div className="noise-overlay" />;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseOver = (e) => {
      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="hidden lg:block fixed pointer-events-none z-[9999]"
      animate={{
        left: position.x,
        top: position.y,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 255, 136, 0)'
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-10 h-10 border border-green-500/30 rounded-full flex items-center justify-center relative">
        <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#00ff88]" />
        <motion.div
          className="absolute inset-0 border border-green-500/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
    </motion.div>
  );
};

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
      className={`glass-cinematic relative group p-8 rounded-[2rem] border-white/5 neo-card ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      <div className="absolute inset-0 light-sweep-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
      <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/[0.04] transition-all duration-500 rounded-[2rem]" />
    </motion.div>
  );
};

// --- Page Sections ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Clients', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-3xl border-b border-white/10' : 'py-8 bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <motion.a
          href="#"
          className="flex items-center gap-5 group"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-green-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
            <img src={logo} alt="Nexlifie Logo" className="h-10 w-auto relative z-10 brightness-110" />
          </div>
          <span className="text-2xl font-black tracking-[0.1em] text-white font-heading uppercase">NEXLIFIE</span>
        </motion.a>

        <div className="hidden lg:flex items-center gap-14">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-[12px] font-black uppercase tracking-[0.22em] text-white hover:text-green-400 transition-all flex items-center gap-3 relative group/link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div className="h-8 w-[1px] bg-white/15 mx-4" />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 136, 0.4)" }}
            className="px-8 py-3 glass-cinematic border-green-500/40 text-green-400 text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-green-500 hover:text-black transition-all"
          >
            Launch System
          </motion.button>
        </div>
      </div>
      <motion.div className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-500 shadow-[0_0_15px_#00ff88] origin-left z-20" style={{ scaleX }} />
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
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

      <div className="container mx-auto px-10 relative z-20 text-center">
        <motion.div
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-8xl md:text-[220px] font-black leading-none tracking-tighter mb-6 text-white font-heading relative inline-block">
            Nexlifie
            <div className="absolute -inset-20 bg-green-500/15 blur-[140px] -z-10 rounded-full animate-pulse" />
          </h1>

          <p className="text-sm md:text-2xl font-mono text-green-400 tracking-[0.8em] uppercase flex justify-center items-center gap-6 mb-16 neon-glow-text">
            Innovate <Sparkles size={20} /> Build <Activity size={20} /> Grow
          </p>

          <p className="max-w-4xl mx-auto text-xl md:text-2xl text-white/50 mb-20 font-light leading-relaxed tracking-wider">
            We build modern websites, powerful applications, AI solutions, and automation systems for growing businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 255, 136, 0.6)" }}
              className="px-16 py-7 bg-green-500 text-black font-black uppercase tracking-[0.4em] text-[13px] rounded-3xl relative group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/40 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, border: "1px solid #00ff88" }}
              className="px-16 py-7 glass-cinematic border-white/10 text-white font-black uppercase tracking-[0.4em] text-[13px] rounded-3xl flex items-center gap-5 group"
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              View Services <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
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
    <section id="services" className="py-48 relative overflow-hidden">
      <div className="container mx-auto px-10">
        <motion.div
          className="mb-32 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-7xl md:text-[120px] font-black tracking-tighter leading-none uppercase">CORE <br /><span className="text-white/10">SERVICES</span></h2>
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
              <TiltCard className="h-full">
                <div className="text-green-400 mb-8 p-6 w-fit rounded-2xl bg-white/5 border border-white/5 group-hover:bg-green-500 group-hover:text-black transition-all group-hover:neon-border-glow shadow-2xl">
                  {React.cloneElement(service.icon, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase group-hover:text-green-400 transition-colors">{service.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed font-mono uppercase tracking-[0.1em] mb-10">{service.text}</p>
                <div className="mt-auto border-t border-white/5 pt-8 flex justify-end items-center opacity-40 group-hover:opacity-100 transition-opacity">
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
    <section id="about" className="py-48 relative overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative group perspective-[2000px]"
          >
            <div className="absolute -inset-20 bg-green-500/10 blur-[180px] rounded-full group-hover:bg-green-500/20 transition-all duration-[2s]" />
            <div className="relative rounded-[4rem] overflow-hidden border border-white/10 glass-cinematic p-3 shadow-3xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400"
                alt="Nexlifie Vision"
                className="rounded-[4rem] grayscale group-hover:grayscale-0 transition-all duration-[1.5s] brightness-75 group-hover:brightness-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-[110px] font-black mb-14 tracking-tighter leading-[0.9] uppercase underline underline-offset-[20px] decoration-green-500/20">WE BUILD <br />SCALABLE <br /><span className="text-white/10">FUTURES.</span></h2>
            <div className="space-y-10 mb-16">
              <p className="text-2xl text-white/40 font-light leading-relaxed tracking-wide max-w-2xl">
                Nexlifie is a modern software and digital solutions company focused on building innovative, scalable, and intelligent technology products for businesses around the world.
              </p>
              <p className="text-2xl text-white/40 font-light leading-relaxed tracking-wide max-w-2xl">
                We specialize in creating high-quality websites, powerful web applications, mobile applications, AI-driven solutions, automation systems, and result-oriented digital marketing strategies.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-20 border-l-2 border-green-500/30 pl-16 py-4">
              <div>
                <h4 className="text-7xl font-black text-green-500 neon-glow-text">150+</h4>
                <p className="text-xs font-mono uppercase tracking-widest text-white/20 mt-4">Synced Missions</p>
              </div>
              <div>
                <h4 className="text-7xl font-black text-white/20 leading-none">Global</h4>
                <p className="text-xs font-mono uppercase tracking-widest text-white/20 mt-4">Reach</p>
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
          className="text-center mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <span className="text-green-500 font-black tracking-[1em] text-[12px] uppercase mb-8 block">Global Feedback Matrix</span>
          <h2 className="text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-none">CLIENT <span className="text-white/10">SUCCESS.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -20 }}
              transition={{ delay: i * 0.2 }}
              className="glass-cinematic p-14 rounded-[3.5rem] border border-white/5 shadow-2xl group transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full group-hover:bg-green-500/10 transition-all" />
              <div className="flex gap-2 text-green-500 mb-10 group-hover:neon-glow-text">
                {[1, 2, 3, 4, 5].map(star => <Zap size={22} key={star} fill="currentColor" />)}
              </div>
              <p className="text-3xl text-white/60 italic mb-14 font-light leading-relaxed tracking-wide">"{t.text}"</p>
              <div className="flex items-center gap-8 border-t border-white/5 pt-12">
                <div className="w-20 h-20 bg-green-500/10 rounded-2xl border border-green-500/30 flex items-center justify-center group-hover:neon-border-glow transition-all">
                  {t.icon}
                </div>
                <div>
                  <h5 className="text-2xl font-black text-white hover:text-green-500 transition-colors uppercase tracking-tight">{t.client}</h5>
                  <p className="text-[12px] text-green-500 font-mono uppercase tracking-[0.4em] mt-2 opacity-60">Verified Partner</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-48 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-green-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-10 relative z-10">
        <div className="glass-cinematic p-16 md:p-32 rounded-[5rem] border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="relative">
            <h2 className="text-6xl md:text-[130px] font-black mb-16 tracking-tighter leading-none uppercase">START <br /><span className="text-white/10">THE MISSION.</span></h2>

            <div className="space-y-16">
              <div className="flex flex-col gap-6 group cursor-pointer">
                <span className="text-[11px] font-black uppercase text-white/20 tracking-[0.5em] font-mono">SECURE EMAIL</span>
                <p className="text-4xl font-black font-heading text-white group-hover:text-green-400 transition-all duration-500 flex items-center gap-6">nexlifie@gmail.com <ArrowRight size={28} className="opacity-0 group-hover:opacity-100 transition-all" /></p>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-[11px] font-black uppercase text-white/20 tracking-[0.5em] font-mono">BROCHURE DOMAIN</span>
                <p className="text-4xl font-black font-heading text-white tracking-tight">nexlifie.com</p>
              </div>
            </div>
            <div className="mt-20 flex gap-8">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div key={i} className="w-14 h-14 glass-cinematic rounded-2xl flex items-center justify-center hover:bg-green-500 hover:text-black transition-all cursor-pointer">
                  <Icon size={24} />
                </div>
              ))}
            </div>
          </div>

          <motion.form
            action="https://formspree.io/f/mkgogayw"
            method="POST"
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-5">
                <label className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 ml-2">ENTITY_ID</label>
                <input name="name" type="text" placeholder="Authorized Name" required className="w-full bg-white/5 border-b border-white/10 p-6 focus:border-green-500 outline-none transition-all placeholder:text-white/10 font-mono text-lg" />
              </div>
              <div className="space-y-5">
                <label className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 ml-2">NETWORK_ADR</label>
                <input name="email" type="email" placeholder="Work Identity" required className="w-full bg-white/5 border-b border-white/10 p-6 focus:border-green-500 outline-none transition-all placeholder:text-white/10 font-mono text-lg" />
              </div>
            </div>
            <div className="space-y-5">
              <label className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 ml-2">TRANSMISSION_DETAILS</label>
              <textarea name="message" placeholder="Outline your digital vision..." rows="5" required className="w-full bg-white/5 border-b border-white/10 p-6 focus:border-green-500 outline-none transition-all placeholder:text-white/10 font-mono text-lg"></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 80px rgba(0, 255, 136, 0.4)" }}
              className="w-full py-10 bg-green-500 text-black font-black uppercase tracking-[0.6em] text-[14px] rounded-[2.5rem] transition-all flex items-center justify-center gap-8 group"
            >
              ESTABLISH CONNECTION <Rocket size={26} className="group-hover:translate-x-4 transition-transform duration-500" />
            </motion.button>
          </motion.form>
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
          <img src={logo} alt="Logo" className="h-20 w-auto mb-12 brightness-150 saturate-150 shadow-[0_0_50px_rgba(0,255,136,0.3)]" />
          <h2 className="text-6xl font-black uppercase tracking-[0.6em] mb-6 font-heading">NEXLIFIE</h2>
          <p className="text-[16px] font-mono font-black text-green-500/60 uppercase tracking-[1em]">Innovate | Build | Grow</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto mb-32 border-y border-white/5 py-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 font-mono">Direct Channel</span>
            <p className="text-xl font-bold hover:text-green-400 transition-colors">nexlifie@gmail.com</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 font-mono">Digital Domain</span>
            <p className="text-xl font-bold hover:text-green-400 transition-colors">nexlifie.com</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 opacity-30 px-10">
          <div className="flex flex-col gap-4 text-left">
            <p className="text-[11px] font-mono tracking-widest uppercase">Kernel Protocol // Node Synchronized</p>
            <p className="text-[11px] font-black uppercase tracking-widest">© 2026 Nexlifie. Elite Engineering Group.</p>
          </div>
          <div className="flex gap-16 text-[11px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-[#020202] text-white selection:bg-green-500/40 selection:text-green-400 min-h-screen relative overflow-hidden cursor-none">
      <NoiseOverlay />
      <CustomCursor />

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
            <div className="text-center mb-32">
              <h2 className="text-5xl md:text-9xl font-black mb-8 tracking-tighter uppercase">AI <span className="text-green-500 neon-glow-text">DASHBOARD</span></h2>
              <p className="text-[14px] font-black uppercase tracking-[1em] text-white/30">Technology Integration Interface</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
              {["React", "Next.js", "Node.js", "Python", "OpenAI", "TensorFlow", "AWS", "Docker", "MongoDB", "TypeScript", "Kotlin", "Swift", "Flutter"].map((tech, i) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 136, 0.1)', borderColor: '#00ff88' }}
                  className="px-12 py-5 glass-cinematic border border-white/10 rounded-2xl font-mono text-sm tracking-widest uppercase transition-all duration-500 cursor-none"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Global Features Section (Level 7) */}
        <section className="py-48 relative">
          <div className="container mx-auto px-10">
            <div className="text-center mb-40">
              <h2 className="text-6xl md:text-[140px] font-black tracking-tighter mb-8 text-white uppercase"><span className="text-white/10 text-glow">WHY</span> NEXLIFIE?</h2>
              <div className="w-60 h-[3px] bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "Elite Design", icon: <Boxes />, code: "USER_EXP" },
                { title: "AI Integrated", icon: <Activity />, code: "AI_LOGIC" },
                { title: "High Speed", icon: <Cloud />, code: "SCALABLE" },
                { title: "Max Security", icon: <Shield />, code: "SAFE_PRO" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -25, scale: 1.05 }}
                  className="p-16 glass-cinematic border-white/5 text-center group transition-all duration-500 rounded-[3.5rem] shadow-2xl overflow-hidden relative"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500/20 group-hover:bg-green-500 transition-colors" />
                  <div className="text-green-500 mb-10 flex justify-center group-hover:scale-125 transition-transform duration-700">
                    {React.cloneElement(feature.icon, { size: 40 })}
                  </div>
                  <p className="text-[12px] font-mono text-white/20 mb-6 tracking-widest">{feature.code}</p>
                  <h4 className="text-3xl font-black font-heading uppercase tracking-tighter mb-6 group-hover:text-green-400 transition-colors">{feature.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
