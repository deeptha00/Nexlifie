import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import logo from '../assets/logo.png';

const MotionLink = motion(Link);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', to: '/services' },
    { name: 'About', to: '/about' },
    { name: 'Clients', to: '/clients' },
    { name: 'Contact', to: '/contact' },
  ];

  const HamburgerIcon = ({ isOpen }) => (
    <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 relative">
      <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-full h-[2px] bg-white rounded-full block origin-center transition-colors group-hover:bg-green-400" />
      <motion.span animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }} className="w-full h-[2px] bg-white rounded-full block transition-colors group-hover:bg-green-400" />
      <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-full h-[2px] bg-white rounded-full block origin-center transition-colors group-hover:bg-green-400" />
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled || mobileMenuOpen ? 'py-3 md:py-4 bg-black/80 backdrop-blur-3xl border-b border-white/10' : 'py-5 md:py-8 bg-gradient-to-b from-black/60 to-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 flex justify-between items-center">
        <MotionLink
          to="/"
          className="flex items-center group"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img 
            src={logo} 
            alt="Nexlifie Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto scale-[1.5] md:scale-[2] xl:scale-[2.5] origin-left brightness-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all duration-500" 
          />
        </MotionLink>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-14">
          {navLinks.map((link, i) => (
            <MotionLink
              key={link.name}
              to={link.to}
              className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.22em] text-white hover:text-green-400 transition-all"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.name}
            </MotionLink>
          ))}
          <motion.div className="h-8 w-[1px] bg-white/15 mx-2 xl:mx-4" />
          <motion.button
            onClick={() => navigate('/contact')}
            className="px-6 xl:px-8 py-3 glass-cinematic border-green-500/40 text-green-400 text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-green-500 hover:text-black transition-all"
          >
            Launch System
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
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
                <MotionLink
                  key={link.name}
                  to={link.to}
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="text-5xl xs:text-6xl font-black uppercase tracking-tighter text-white hover:text-green-400 transition-all group relative"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <motion.span className="absolute -bottom-2 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-500" />
                </MotionLink>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs mt-10"
              >
                <button
                  className="w-full py-6 bg-green-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_0_50px_rgba(0,255,136,0.2)] hover:shadow-[0_0_70px_rgba(0,255,136,0.4)] transition-all active:scale-95 relative overflow-hidden group"
                  onClick={() => { setMobileMenuOpen(false); navigate('/contact'); }}
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

export default Navbar;
