import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Activity, Cloud, Shield } from 'lucide-react';

const WhyNexlifie = () => (
  <section className="py-16 md:py-24 relative">
    <div className="container mx-auto px-10">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl sm:text-6xl md:text-9xl lg:text-[140px] font-black tracking-tighter mb-6 md:mb-8 text-white uppercase leading-[1.1] md:leading-none">
          <span className="text-white/10 text-glow">WHY</span> NEXLIFIE?
        </h2>
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
            <h4 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tighter mb-4 md:mb-6 group-hover:text-green-400 transition-colors">
              {feature.title}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyNexlifie;
