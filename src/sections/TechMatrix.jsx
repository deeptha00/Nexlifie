import { motion } from 'framer-motion';

const TechMatrix = () => (
  <section className="py-16 md:py-24 relative overflow-hidden bg-[#020202]">
    {/* Background Grid and Glows */}
    <div className="absolute inset-0 digital-grid-system opacity-[0.03] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    <div className="container mx-auto px-6 md:px-10 relative z-10">
      <motion.div 
        className="flex flex-col items-center text-center mb-20 md:mb-28"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-green-500/50" />
          <span className="text-[9px] md:text-[10px] font-mono text-green-500 tracking-[0.5em] uppercase">System Architecture</span>
          <div className="w-12 h-[1px] bg-green-500/50" />
        </div>
        <h2 className="text-5xl sm:text-7xl md:text-[90px] font-black mb-6 tracking-tighter uppercase drop-shadow-2xl">
          AI <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]">DASHBOARD</span>
        </h2>
        <p className="text-[11px] md:text-sm font-black uppercase tracking-[0.6em] text-white/40">
          Technology Integration Interface
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-[1200px] mx-auto">
        {["React", "Next.js", "Node.js", "Python", "OpenAI", "TensorFlow", "AWS", "Docker", "MongoDB", "TypeScript", "Kotlin", "Swift", "Flutter"].map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(34,197,94,0.08)', 
              borderColor: 'rgba(34,197,94,0.4)',
              boxShadow: '0 0 30px rgba(34,197,94,0.15)'
            }}
            className="flex items-center gap-3 px-6 md:px-10 py-4 md:py-5 bg-white/[0.02] backdrop-blur-md border border-white/[0.05] rounded-[1rem] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-default group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-green-500 group-hover:shadow-[0_0_10px_#22c55e] transition-all duration-500" />
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/60 group-hover:text-white uppercase transition-colors duration-300">
              {tech}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechMatrix;
