import { motion } from 'framer-motion';
import WhatsAppIcon from './ui/WhatsAppIcon';

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919591522856?text=Hi%20Nexlifie!%20I%20am%20interested%20in%20your%20services."
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.7)] transition-shadow text-black group"
  >
    <div className="absolute -inset-2 bg-green-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    <WhatsAppIcon size={32} className="relative z-10" />
  </motion.a>
);

export default WhatsAppButton;
