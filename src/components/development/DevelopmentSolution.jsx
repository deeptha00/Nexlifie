import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { PlatformUI } from './visuals';

const before = ['CRM', 'HRMS', 'Inventory', 'Sales', 'Operations', 'Reports', 'Customer Portal'];

const promises = [
  { label: 'One login', detail: 'Your whole team, one set of credentials.' },
  { label: 'One platform', detail: 'Every department working in the same system.' },
  { label: 'One source of truth', detail: 'Data entered once, correct everywhere.' },
];

/* The scattered starting point. */
const BeforeStack = () => (
  <motion.div {...staggerParent(0.06)} className="flex flex-col gap-2">
    <span className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-2">BEFORE</span>
    {before.map((item) => (
      <motion.div
        key={item}
        variants={staggerItem}
        className="rounded-lg border border-dashed border-[rgb(var(--ink-rgb)/18%)] bg-[rgb(var(--ink-rgb)/2%)] px-3.5 py-2.5"
      >
        <p className="text-xs font-semibold text-[rgb(var(--ink-rgb)/50%)] leading-none">{item}</p>
      </motion.div>
    ))}
  </motion.div>
);

const DevelopmentSolution = () => (
  <section id="capabilities" className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
        <Eyebrow className="mb-6">CUSTOM BUSINESS SOFTWARE</Eyebrow>
        <SectionTitle className="mb-6">
          One Business.<br />One Connected System.
        </SectionTitle>
        <SectionLead className="max-w-xl">
          Instead of managing multiple disconnected tools, we combine the systems your business
          actually needs into one customized platform.
        </SectionLead>
      </motion.div>

      {/* Scattered → converged */}
      <motion.div
        {...fadeUpScale(0.05)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
      >
        <div className="lg:col-span-3">
          <BeforeStack />
        </div>

        <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-1 text-green-600" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 - i * 0.25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            >
              <ChevronRight size={22} className="hidden lg:block" />
              <ChevronDown size={22} className="lg:hidden" />
            </motion.span>
          ))}
        </div>

        <div className="lg:col-span-8">
          <span className="block font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-2">
            AFTER — NEXLIFIE BUSINESS PLATFORM
          </span>
          <PlatformUI />
        </div>
      </motion.div>

      {/* One login. One platform. One source of truth. */}
      <motion.div
        {...staggerParent(0.1, 0.1)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mt-16 md:mt-20 pt-12 border-t border-[rgb(var(--ink-rgb)/10%)]"
      >
        {promises.map((p) => (
          <motion.div key={p.label} variants={staggerItem}>
            <p className="font-heading text-xl md:text-2xl font-bold tracking-tight text-[var(--secondary)] mb-2">
              {p.label}.
            </p>
            <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed">{p.detail}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* The workflow argument */}
      <motion.div {...fadeUp(0.1)} className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
        <p className="lg:col-span-8 font-heading text-xl sm:text-2xl md:text-[30px] leading-[1.35] font-medium tracking-tight text-[var(--secondary)] text-balance">
          Every business has its own workflow. We don't give you a fixed software package and ask
          you to change your process.{' '}
          <span className="text-[var(--primary)]">
            We understand your workflow and build the system around it.
          </span>
        </p>
        <div className="lg:col-span-4 lg:text-right">
          <CTAText to="/contact">Build My Business Software</CTAText>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DevelopmentSolution;
