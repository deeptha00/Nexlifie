import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

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
    <section id="testimonials" className="py-24 md:py-32 relative bg-[#020202] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 digital-grid-system opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-green-500/50" />
            <span className="text-green-500 font-black tracking-[0.6em] md:tracking-[0.8em] text-[9px] md:text-[11px] uppercase">
              Global Feedback Matrix
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-green-500/50" />
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
            CLIENT <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5">SUCCESS.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-[1200px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-8 md:p-12 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] group hover:bg-white/[0.03] hover:border-green-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(34,197,94,0.1)] transition-all duration-500 overflow-hidden"
            >
              {/* Premium Inner Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-500/10 to-transparent blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex gap-1.5 text-green-500 mb-8 md:mb-10 relative z-10">
                {[1, 2, 3, 4, 5].map(star => (
                  <Zap size={16} key={star} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                ))}
              </div>
              
              <p className="text-lg md:text-2xl text-white/80 italic mb-12 md:mb-16 font-light leading-relaxed tracking-wide relative z-10">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-5 md:gap-6 border-t border-white/5 pt-8 relative z-10 group-hover:border-white/10 transition-colors duration-500">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500/20 to-transparent rounded-full border border-green-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-green-400 transition-all duration-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  {React.cloneElement(t.icon, { size: 20, className: "text-green-400" })}
                </div>
                <div>
                  <h5 className="text-lg md:text-xl font-black text-white group-hover:text-green-400 transition-colors uppercase tracking-widest drop-shadow-md">
                    {t.client}
                  </h5>
                  <p className="text-[9px] md:text-[10px] text-green-500/70 font-mono uppercase tracking-[0.4em] mt-1.5 group-hover:text-green-400 transition-colors">
                    Verified Partner
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
