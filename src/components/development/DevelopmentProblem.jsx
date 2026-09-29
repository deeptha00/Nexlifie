import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, CTAText } from './parts';

/* Deterministic tilts — a business's tool sprawl never lines up neatly. */
const tools = [
  { name: 'CRM', tilt: '-2.5deg' },
  { name: 'HRMS', tilt: '1.5deg' },
  { name: 'Excel', tilt: '-1deg' },
  { name: 'WhatsApp', tilt: '2deg' },
  { name: 'Inventory', tilt: '-1.5deg' },
  { name: 'Accounting', tilt: '2.5deg' },
  { name: 'Email', tilt: '-2deg' },
  { name: 'Project Management', tilt: '1deg' },
  { name: 'Website', tilt: '-1deg' },
  { name: 'Customer Portal', tilt: '2deg' },
];

const consequences = [
  'Different systems.',
  'Different logins.',
  'Repeated data.',
  'Disconnected teams.',
  'Scattered information.',
];

/** Each tool is its own little window, with its own login. None of them meet. */
const ToolWindow = ({ name, tilt }) => (
  <motion.div
    variants={staggerItem}
    style={{ rotate: tilt }}
    className="rounded-lg border border-dashed border-white/15 bg-white/[0.035] px-3 py-2.5 min-w-[104px]"
  >
    <div className="flex items-center gap-1.5 mb-2" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <span className="ml-auto font-mono text-[8px] text-white/25">LOGIN</span>
    </div>
    <p className="text-[11px] font-semibold text-white/65 leading-none whitespace-nowrap">{name}</p>
  </motion.div>
);

const DevelopmentProblem = () => (
  <section className="bg-[#111111] text-white py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
        {/* Question + consequences */}
        <motion.div {...fadeUp(0)} className="lg:col-span-5">
          <Eyebrow tone="dark" className="mb-7">THE PROBLEM</Eyebrow>
          <SectionTitle tone="dark" className="mb-10">
            How many tools does your business use every day?
          </SectionTitle>

          <motion.ul {...staggerParent(0.07, 0.1)} className="flex flex-col gap-3">
            {consequences.map((line) => (
              <motion.li
                key={line}
                variants={staggerItem}
                className="flex items-baseline gap-3 text-lg md:text-xl font-medium text-white/60"
              >
                <span className="w-3 h-[1px] bg-white/25 shrink-0 translate-y-[-6px]" aria-hidden="true" />
                {line}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* The sprawl */}
        <div className="lg:col-span-7">
          <motion.div
            {...staggerParent(0.06, 0.15)}
            className="flex flex-wrap gap-2.5 md:gap-3 lg:justify-end"
          >
            {tools.map((t) => (
              <ToolWindow key={t.name} {...t} />
            ))}
          </motion.div>

          {/* The turn */}
          <motion.div
            {...fadeUp(0.2, 20)}
            className="mt-12 md:mt-16 pt-10 border-t border-white/10"
          >
            <p className="font-heading text-2xl sm:text-3xl md:text-[38px] leading-[1.15] font-bold tracking-tight text-balance mb-8">
              Your business shouldn't have to{' '}
              <span className="text-green-400">work around your software.</span>
            </p>
            <CTAText to="/contact" tone="dark">See What We Can Build</CTAText>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default DevelopmentProblem;
