import { motion } from 'framer-motion';

const TechMatrix = () => (
  <section className="py-48 relative overflow-hidden bg-black/40">
    <div className="container mx-auto px-10">
      <div className="text-center mb-24 md:mb-32">
        <h2 className="text-4xl sm:text-6xl md:text-9xl font-black mb-6 md:mb-8 tracking-tighter uppercase">
          AI <span className="text-green-500 neon-glow-text">DASHBOARD</span>
        </h2>
        <p className="text-[10px] md:text-[14px] font-black uppercase tracking-[0.6em] md:tracking-[1em] text-white/30">
          Technology Integration Interface
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-7xl mx-auto px-4 md:px-0">
        {["React", "Next.js", "Node.js", "Python", "OpenAI", "TensorFlow", "AWS", "Docker", "MongoDB", "TypeScript", "Kotlin", "Swift", "Flutter"].map((tech) => (
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
);

export default TechMatrix;
