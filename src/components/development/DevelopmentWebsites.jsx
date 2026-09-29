import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { CorporateSite, EcommerceSite, ProductSite } from './visuals';

const capabilities = [
  'Corporate Websites',
  'Business Websites',
  'E-commerce',
  'Landing Pages',
  'Portfolio Websites',
  'Product Websites',
  'CMS Websites',
];

const Caption = ({ kind, job }) => (
  <div className="mb-3">
    <span className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))]">{kind}</span>
    <p className="text-sm text-[rgb(var(--ink-rgb)/60%)] mt-1.5 leading-snug">{job}</p>
  </div>
);

const DevelopmentWebsites = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
        <Eyebrow className="mb-6">05 / WEBSITES</Eyebrow>
        <SectionTitle className="mb-6">More Than a Website.</SectionTitle>
        <SectionLead className="max-w-xl">
          Your website is often the first interaction someone has with your business. We build
          websites that communicate your brand, generate trust and turn visitors into customers.
        </SectionLead>
      </motion.div>

      {/* Three jobs, three very different websites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-start mb-8 lg:mb-10">
        <motion.div {...fadeUpScale(0)} className="lg:col-span-7">
          <Caption kind="CORPORATE" job="Establishes credibility for a buyer who is still deciding." />
          <CorporateSite />
        </motion.div>

        <motion.div {...fadeUpScale(0.1)} className="lg:col-span-5 lg:pt-10">
          <Caption kind="E-COMMERCE" job="Removes every step between browsing and checkout." />
          <EcommerceSite />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
        <motion.div {...fadeUpScale(0.05)} className="lg:col-span-5">
          <Caption kind="PRODUCT / STARTUP" job="States one idea clearly and asks for one action." />
          <ProductSite />
        </motion.div>

        <div className="lg:col-span-7 lg:pb-2">
          <motion.div
            {...staggerParent(0.05, 0.05)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-9 pt-8 border-t border-[rgb(var(--ink-rgb)/10%)]"
          >
            {capabilities.map((c) => (
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

          <motion.p
            {...fadeUp(0.1)}
            className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-[var(--secondary)] mb-8 max-w-md text-balance"
          >
            A website should do a job. We decide what that job is before we design a single screen.
          </motion.p>

          <CTAText to="/services/website-development">Build My Website</CTAText>
        </div>
      </div>
    </div>
  </section>
);

export default DevelopmentWebsites;
