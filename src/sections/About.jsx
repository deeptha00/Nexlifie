import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center">
          {/* Left Side: Advanced Image Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 lg:order-1"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

            {/* Main Image Container */}
            <div className="relative z-10 glass-cinematic p-4 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
              <div className="relative rounded-[1.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400"
                  alt="Nexlifie Innovation"
                  className="w-full aspect-[4/5] md:aspect-square object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Floating Tech Data */}
                <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3 pointer-events-none">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-cinematic px-4 py-3 rounded-xl border border-white/20 flex items-center gap-3 backdrop-blur-md shadow-2xl"
                  >
                    <Activity size={16} className="text-green-500" />
                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">System Active</span>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="glass-cinematic px-4 py-3 rounded-xl border border-white/20 flex items-center gap-3 backdrop-blur-md shadow-2xl"
                  >
                    <ShieldCheck size={16} className="text-green-500" />
                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">Secure Protocol</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative Grid Lines behind image */}
            <div className="absolute -inset-10 digital-grid-system opacity-30 z-0 mask-radial pointer-events-none" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative z-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-green-500" />
              <span className="text-[10px] md:text-xs font-mono text-green-500 tracking-[0.4em] uppercase">About Nexlifie</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.95] uppercase">
              WE BUILD <br />
              <span className="text-white/40">SCALABLE</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">FUTURES.</span>
            </h2>

            <div className="border-l-2 border-green-500/30 pl-6 md:pl-10 mb-8 py-2">
              <p className="text-base md:text-lg text-white/60 font-light leading-relaxed tracking-wide">
                We help manufacturing, educational institutions, healthcare, and startups automate their business with premium websites, AI solutions, and custom software.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              <div className="group cursor-default">
                <div className="flex items-baseline gap-1 mb-3">
                  <h4 className="text-5xl md:text-7xl font-black text-white group-hover:text-green-500 transition-colors duration-500">15</h4>
                  <span className="text-3xl md:text-5xl font-black text-green-500">+</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 group-hover:bg-green-500/50 transition-colors duration-500 mb-4" />
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                  <Zap size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  Projects Delivered
                </p>
              </div>

              <div className="group cursor-default">
                <div className="flex items-baseline gap-1 mb-3">
                  <h4 className="text-5xl md:text-7xl font-black text-white group-hover:text-green-500 transition-colors duration-500">100</h4>
                  <span className="text-3xl md:text-5xl font-black text-green-500">%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 group-hover:bg-green-500/50 transition-colors duration-500 mb-4" />
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-3">
                  <Zap size={14} className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  Global Scale
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
