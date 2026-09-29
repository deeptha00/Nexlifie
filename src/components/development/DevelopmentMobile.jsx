import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { PhonePair } from './visuals';

const categories = [
  'Customer Apps', 'Business Apps', 'E-commerce Apps', 'Booking Apps', 'Service Apps',
  'Healthcare Apps', 'Education Apps', 'Fintech Apps', 'Social Apps', 'On-demand Apps',
];

const platforms = ['Android', 'iOS', 'Cross-platform'];

const DevelopmentMobile = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/8%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
        {/* Phones */}
        <motion.div {...fadeUpScale(0)} className="lg:col-span-6 order-2 lg:order-1">
          <PhonePair />
        </motion.div>

        {/* Copy */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-6 order-1 lg:order-2">
          <Eyebrow className="mb-6">03 / MOBILE APPLICATIONS</Eyebrow>
          <SectionTitle className="mb-6">
            Your Business,<br />In Your Customers' Hands.
          </SectionTitle>
          <SectionLead className="max-w-lg mb-9">
            We design and build Android and iOS applications that turn ideas, services and business
            processes into powerful mobile experiences.
          </SectionLead>

          <motion.div
            {...staggerParent(0.05, 0.1)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-lg mb-9"
          >
            {categories.map((c) => (
              <motion.div
                key={c}
                variants={staggerItem}
                className="flex items-baseline gap-2.5 text-sm text-[rgb(var(--ink-rgb)/70%)] font-medium"
              >
                <span className="w-2.5 h-[1px] bg-green-600 shrink-0 translate-y-[-4px]" aria-hidden="true" />
                {c}
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center gap-5 mb-9 pt-7 border-t border-[rgb(var(--ink-rgb)/10%)]">
            {platforms.map((p) => (
              <span key={p} className="font-mono text-[11px] tracking-[0.14em] text-[rgb(var(--muted-rgb))]">
                {p.toUpperCase()}
              </span>
            ))}
          </div>

          <CTAText to="/services/mobile-apps">Build a Mobile App</CTAText>
        </motion.div>
      </div>
    </div>
  </section>
);

export default DevelopmentMobile;
