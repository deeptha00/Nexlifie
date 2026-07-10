import { motion } from 'framer-motion';

const Footer = () => (
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
    </div>
  </footer>
);

export default Footer;
