import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const NotFoundPage = () => (
  <PageLayout title="Page Not Found — Nexlifie" description="The page you're looking for doesn't exist or has moved." noindex>
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6 py-24">
      <div className="absolute inset-0 digital-grid-system mask-radial opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[96px] sm:text-[140px] leading-none font-black text-white/10 select-none mb-2"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl sm:text-3xl font-bold text-white -mt-8 sm:-mt-14 mb-4"
        >
          This page doesn't exist.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/50 text-sm sm:text-base mb-10"
        >
          The page you're looking for may have been moved, renamed, or never existed. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 bg-green-500 text-black font-semibold text-sm px-7 py-4 rounded-2xl hover:bg-green-400 transition-colors"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 border border-white/15 text-white font-semibold text-sm px-7 py-4 rounded-2xl hover:border-white/40 hover:bg-white/5 transition-colors"
          >
            Contact Us
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default NotFoundPage;
