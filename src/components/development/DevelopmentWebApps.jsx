import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { Dashboard } from './visuals';

const examples = [
  'CRM', 'ERP', 'HRMS', 'Admin Platforms', 'Customer Portals',
  'Dashboards', 'Booking Systems', 'E-commerce Platforms', 'SaaS Products', 'Management Systems',
];

const promises = ['Designed for your users.', 'Built for your workflow.', 'Ready to scale.'];

const DevelopmentWebApps = () => (
  <section className="bg-[rgb(var(--ink-rgb)/2.5%)] py-20 md:py-32 border-y border-[rgb(var(--ink-rgb)/8%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 md:mb-16">
        <motion.div {...fadeUp(0)} className="lg:col-span-7">
          <Eyebrow className="mb-6">04 / WEB APPLICATIONS</Eyebrow>
          <SectionTitle className="mb-6">
            Powerful Software.<br />Available Anywhere.
          </SectionTitle>
          <SectionLead className="max-w-xl">
            From internal business platforms to customer-facing applications, we build scalable web
            applications designed around your users and workflows.
          </SectionLead>
        </motion.div>

        <motion.div
          {...staggerParent(0.04, 0.1)}
          className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-2.5"
        >
          {examples.map((e) => (
            <motion.div
              key={e}
              variants={staggerItem}
              className="flex items-baseline gap-2.5 text-sm text-[rgb(var(--ink-rgb)/70%)] font-medium"
            >
              <span className="w-2.5 h-[1px] bg-green-600 shrink-0 translate-y-[-4px]" aria-hidden="true" />
              {e}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div {...fadeUpScale(0.05)}>
        <Dashboard />
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
      >
        <div className="lg:col-span-8">
          <p className="font-heading text-2xl sm:text-3xl md:text-[38px] leading-[1.18] font-bold tracking-tight text-[var(--secondary)] text-balance">
            {promises[0]}<br />
            {promises[1]}<br />
            <span className="text-[var(--primary)]">{promises[2]}</span>
          </p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <CTAText to="/services/web-applications">Build a Web Application</CTAText>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DevelopmentWebApps;
