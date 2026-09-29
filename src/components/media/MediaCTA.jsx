import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import WhatsAppIcon from '../ui/WhatsAppIcon';

const MotionLink = motion(Link);

const nextSteps = [
  { step: '01', text: 'Tell us the business and the goal.' },
  { step: '02', text: 'We come back with how we would approach it, and what it involves.' },
  { step: '03', text: 'If it fits, we plan it properly and get to work.' },
];

const MediaCTA = () => (
  <section className="bg-[#111111] text-[#F7F8F6] pt-20 pb-20 md:pt-28 md:pb-28">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div {...fadeUp(0, 30)} className="lg:col-span-7">
          <h2 className="font-heading text-[42px] sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-7 text-balance">
            Ready to get seen?
          </h2>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-xl mb-9">
            Tell us about your brand and where you want it to go. We will tell you exactly
            how we would get you there — and whether we are the right people to do it.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 bg-green-500 text-[#111111] text-sm font-semibold px-8 py-5 rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,255,136,0.35)] hover:bg-green-400 hover:shadow-[0_12px_40px_-8px_rgba(0,255,136,0.5)] transition-[background-color,box-shadow]"
            >
              Start a conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MotionLink>
            <a
              href="https://wa.me/919591522856?text=Hi%20Nexlifie!%20I%20would%20like%20to%20talk%20about%20marketing%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/20 px-6 py-5 rounded-2xl hover:border-green-500 hover:text-green-400 transition-colors"
            >
              <WhatsAppIcon size={16} />
              WhatsApp us
            </a>
            <a
              href="mailto:info@nexlifie.com"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-green-400 transition-colors"
            >
              <Mail size={15} />
              info@nexlifie.com
            </a>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.12, 30)} className="lg:col-span-5 lg:pt-4">
          <p className="text-[11px] font-mono tracking-[0.3em] text-white/30 mb-7">WHAT HAPPENS NEXT</p>
          <ol className="space-y-6">
            {nextSteps.map((s) => (
              <li key={s.step} className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full border border-green-500/40 flex items-center justify-center font-mono text-[11px] text-green-500">
                  {s.step}
                </span>
                <span className="text-sm md:text-[15px] text-white/60 leading-relaxed pt-1.5">{s.text}</span>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-white/35 leading-relaxed mt-8 pt-7 border-t border-white/10">
            Not sure which package fits, or whether you need one at all? Ask anyway —
            we would rather point you somewhere useful than sell you something you do not need.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MediaCTA;
