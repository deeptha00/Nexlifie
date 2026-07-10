import { motion } from 'framer-motion';
import NoiseOverlay from './ui/NoiseOverlay';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import PageHead from './PageHead';

/**
 * PageTopSpacer — clears the fixed navbar and shows a compact breadcrumb label.
 * The section's own heading acts as the visual page title — no duplication.
 */
const PageTopSpacer = ({ label }) => (
  <div className="relative pt-24 pb-0 -mb-16 text-center">
    <motion.span
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-green-500/50 font-black tracking-[0.7em] text-[9px] md:text-[10px] uppercase"
    >
      {label}
    </motion.span>
  </div>
);

/**
 * PageLayout — wraps a section component with the shared chrome (Navbar, Footer, SEO, bg).
 */
const PageLayout = ({ title, description, bannerLabel, children }) => (
  <div className="bg-[#020202] text-white selection:bg-green-500/40 selection:text-green-400 min-h-screen relative overflow-hidden">
    <PageHead title={title} description={description} />
    <NoiseOverlay />
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20 digital-grid-system mask-fade-in" />
    <Navbar />
    <main className="relative z-10">
      <PageTopSpacer label={bannerLabel} />
      {children}
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default PageLayout;
