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
    <section id="testimonials" className="py-48 relative bg-black/80">
      <div className="container mx-auto px-10">
        <motion.div
          className="text-center mb-24 md:mb-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <span className="text-green-500 font-black tracking-[0.6em] md:tracking-[1em] text-[10px] md:text-[12px] uppercase mb-6 md:mb-8 block">
            Global Feedback Matrix
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-[120px] font-black tracking-tighter uppercase leading-none">
            CLIENT <span className="text-white/10">SUCCESS.</span>
          </h2>
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
              <div className="flex gap-2 text-green-500 mb-6 md:mb-10">
                {[1, 2, 3, 4, 5].map(star => <Zap size={18} key={star} fill="currentColor" />)}
              </div>
              <p className="text-xl md:text-3xl text-white/60 italic mb-10 md:mb-14 font-light leading-relaxed tracking-wide">"{t.text}"</p>
              <div className="flex items-center gap-6 md:gap-8 border-t border-white/5 pt-8 md:pt-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-2xl border border-green-500/30 flex items-center justify-center transition-all">
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

export default Testimonials;
