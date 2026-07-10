import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Sparkles, Activity } from 'lucide-react';
import heroVideo from '../assets/video.mp4';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/30" />
        <div className="absolute inset-0 bg-green-500/10 opacity-30" />
      </div>

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
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-green-500 text-black font-black uppercase tracking-[0.4em] text-[10px] md:text-[13px] rounded-xl md:rounded-3xl relative group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/40 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, border: "1px solid #00ff88" }}
              className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 glass-cinematic border-white/10 text-white font-black uppercase tracking-[0.4em] text-[10px] md:text-[13px] rounded-xl md:rounded-3xl flex items-center justify-center gap-5 group"
              onClick={() => navigate('/services')}
            >
              View Services <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative shapes */}
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

export default Hero;
