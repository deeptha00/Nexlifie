import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { SystemHub } from './visuals';

const without = [
  'Multiple tools',
  'Multiple logins',
  'Repeated data entry',
  'Disconnected departments',
  'Manual reporting',
];

const withNexlifie = [
  'One platform',
  'One login',
  'Connected workflows',
  'Centralized data',
  'Automated processes',
  'Custom dashboards',
];

const CompareColumn = ({ title, items, positive }) => (
  <div
    className={`rounded-2xl border p-6 md:p-8 ${
      positive
        ? 'border-green-600/30 bg-green-600/[0.04]'
        : 'border-[rgb(var(--ink-rgb)/12%)] bg-[rgb(var(--ink-rgb)/1.5%)]'
    }`}
  >
    <p className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-6">{title}</p>
    <ul className="flex flex-col gap-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          {positive ? (
            <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center shrink-0">
              <Check size={11} className="text-white" strokeWidth={3} />
            </span>
          ) : (
            <span className="w-5 h-5 rounded-full border border-[rgb(var(--ink-rgb)/18%)] flex items-center justify-center shrink-0">
              <X size={11} className="text-[rgb(var(--ink-rgb)/35%)]" strokeWidth={2.5} />
            </span>
          )}
          <span
            className={`text-sm md:text-[15px] font-medium ${
              positive ? 'text-[var(--secondary)]' : 'text-[rgb(var(--ink-rgb)/50%)]'
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const DevelopmentCustomSoftware = () => {
  return (
    <section className="bg-[var(--bg-dark)] py-20 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-3xl mb-14 md:mb-20">
          <Eyebrow className="mb-6">02 / CUSTOM SOFTWARE</Eyebrow>
          <SectionTitle className="mb-7">
            Stop Adapting Your Business<br />to Someone Else's Software.
          </SectionTitle>
          <p className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-[var(--primary)] mb-5">
            Your workflow is unique. Your software should be too.
          </p>
          <SectionLead className="max-w-xl">
            We design and develop custom platforms that bring your business operations together in
            one system.
          </SectionLead>
        </motion.div>

        {/* Interactive business ecosystem */}
        <div className="mb-20 md:mb-28">
          <SystemHub />
        </div>

        {/* The comparison */}
        <motion.div
          {...staggerParent(0.12)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-24"
        >
          <motion.div variants={staggerItem}>
            <CompareColumn title="WITHOUT CUSTOM SOFTWARE" items={without} />
          </motion.div>
          <motion.div variants={staggerItem}>
            <CompareColumn title="WITH NEXLIFIE" items={withNexlifie} positive />
          </motion.div>
        </motion.div>

        {/* The promise */}
        <motion.div {...fadeUp(0)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="font-heading text-[28px] leading-[1.18] sm:text-4xl sm:leading-[1.14] md:text-[44px] md:leading-[1.12] font-bold tracking-tight text-[var(--secondary)] text-balance">
              Built around your SOP.<br />
              Built around your workflow.<br />
              <span className="text-[var(--primary)]">Built around your business.</span>
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <CTAText to="/services/custom-software">Build My Custom Software</CTAText>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevelopmentCustomSoftware;
