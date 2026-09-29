import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeUp } from '../lib/motion';

const testimonials = [
  {
    client: 'Bumblebee',
    text: 'Nexlifie delivered an excellent website and marketing system for our business. Their team is professional, fast, and highly skilled.',
  },
  {
    client: 'Eyéluxe',
    text: 'Excellent service, modern design, and strong technical support. Nexlifie is the right choice for any business looking to grow digitally.',
  },
];

const Testimonials = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  return (
  <section id="testimonials" className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">CLIENT SUCCESS</span>
        </div>
        <Heading className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
          What partners say<br />about working with us.
        </Heading>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.client}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="p-8 md:p-10 rounded-2xl bg-white border border-[#111111]/12 shadow-[var(--shadow-lift)] transition-shadow duration-300 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex gap-1 text-green-600 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-lg md:text-xl text-[#111111]/80 italic font-light leading-relaxed mb-10">
              "{t.text}"
            </p>
            <div className="flex items-center gap-4 border-t border-[#111111]/10 pt-6">
              <div className="w-11 h-11 rounded-full bg-green-600/10 border border-green-600/20 flex items-center justify-center">
                <span className="text-sm font-bold text-green-700">{t.client.charAt(0)}</span>
              </div>
              <div>
                <h5 className="text-base font-bold text-[#111111]">{t.client}</h5>
                <p className="text-[11px] text-[rgb(var(--muted-rgb))] font-mono tracking-widest mt-0.5">VERIFIED PARTNER</p>
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
