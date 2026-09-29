import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead } from './parts';

const leftSide = ['Custom Software', 'AI', 'Web Application', 'Mobile App'];
const rightSide = ['Website', 'CRM', 'HRMS', 'Inventory'];
const bottomSide = ['Analytics', 'Cloud', 'Automation'];

/* One customer, one continuous path through a connected business. */
const journey = [
  { step: 'Website', note: 'A visitor finds you and enquires.' },
  { step: 'Customer', note: 'The enquiry becomes a known record, once.' },
  { step: 'Mobile App', note: 'They track their order from their phone.' },
  { step: 'CRM', note: 'Your team sees the full history.' },
  { step: 'Sales', note: 'The order is raised against that record.' },
  { step: 'Inventory', note: 'Stock adjusts the moment it is confirmed.' },
  { step: 'Operations', note: 'Fulfilment picks it up with no re-entry.' },
  { step: 'Analytics', note: 'The whole path is measurable.' },
  { step: 'AI Automation', note: 'The repeatable parts stop needing people.' },
];

const Wire = ({ side }) => (
  <span
    className={`hidden md:block flex-1 border-t border-dashed border-[rgb(var(--ink-rgb)/20%)] ${
      side === 'left' ? 'ml-3' : 'mr-3'
    }`}
    aria-hidden="true"
  />
);

const SideItem = ({ label, side }) => (
  <motion.div variants={staggerItem} className="flex items-center">
    {side === 'right' && <Wire side="right" />}
    <span className="rounded-xl border border-[rgb(var(--ink-rgb)/12%)] bg-[var(--bg-dark)] px-3.5 py-2.5 text-xs md:text-[13px] font-semibold text-[rgb(var(--ink-rgb)/70%)] whitespace-nowrap">
      {label}
    </span>
    {side === 'left' && <Wire side="left" />}
  </motion.div>
);

const HubDiagram = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 md:gap-0 items-center">
      {/* left rail */}
      <motion.div {...staggerParent(0.08)} className="flex flex-col gap-3 md:gap-5 items-start md:items-stretch">
        {leftSide.map((l) => (
          <SideItem key={l} label={l} side="left" />
        ))}
      </motion.div>

      {/* the business */}
      <motion.div
        {...fadeUp(0.1)}
        className="mx-auto w-full max-w-[240px] md:w-[240px] rounded-2xl bg-[#111111] text-white px-6 py-7 text-center shadow-[0_30px_60px_-26px_rgba(17,17,17,0.5)]"
      >
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 mb-2">AT THE CENTRE</p>
        <p className="font-heading text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3">
          Your Business
        </p>
        <span className="block w-8 h-[2px] bg-green-500 mx-auto" />
      </motion.div>

      {/* right rail */}
      <motion.div {...staggerParent(0.08, 0.1)} className="flex flex-col gap-3 md:gap-5 items-start md:items-stretch">
        {rightSide.map((l) => (
          <SideItem key={l} label={l} side="right" />
        ))}
      </motion.div>
    </div>

    {/* bottom rail */}
    <motion.div
      {...staggerParent(0.08, 0.2)}
      className="flex flex-wrap justify-center gap-3 mt-6 md:mt-8 md:pt-8 md:border-t md:border-dashed md:border-[rgb(var(--ink-rgb)/20%)]"
    >
      {bottomSide.map((l) => (
        <motion.span
          key={l}
          variants={staggerItem}
          className="rounded-xl border border-[rgb(var(--ink-rgb)/12%)] bg-[var(--bg-dark)] px-3.5 py-2.5 text-xs md:text-[13px] font-semibold text-[rgb(var(--ink-rgb)/70%)]"
        >
          {l}
        </motion.span>
      ))}
    </motion.div>
  </div>
);

const JourneyChain = () => (
  <motion.ol {...staggerParent(0.06, 0.05)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {journey.map((j, i) => (
      <motion.li
        key={j.step}
        variants={staggerItem}
        className="relative border-t border-[rgb(var(--ink-rgb)/10%)] py-5 pr-6 lg:pr-8"
      >
        <div className="flex items-baseline gap-3 mb-1.5">
          <span className="font-mono text-[10px] text-green-600 shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="font-heading text-base md:text-lg font-bold tracking-tight text-[var(--secondary)]">
            {j.step}
          </p>
          {i < journey.length - 1 && (
            <span className="ml-auto font-mono text-xs text-[rgb(var(--ink-rgb)/20%)]" aria-hidden="true">↓</span>
          )}
        </div>
        <p className="text-[13px] text-[rgb(var(--muted-rgb))] leading-relaxed pl-7">{j.note}</p>
      </motion.li>
    ))}
  </motion.ol>
);

const DevelopmentEcosystem = () => (
  <section className="bg-[rgb(var(--ink-rgb)/2.5%)] py-20 md:py-32 border-y border-[rgb(var(--ink-rgb)/8%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
        <Eyebrow className="mb-6">THE NEXLIFIE ECOSYSTEM</Eyebrow>
        <SectionTitle className="mb-6">
          One Technology Partner.<br />Everything Your Business Needs.
        </SectionTitle>
        <SectionLead className="max-w-xl">
          These don't have to be separate systems, bought separately and stitched together later.
          Built by one team, they work as one.
        </SectionLead>
      </motion.div>

      <HubDiagram />

      {/* The integration payoff, end to end */}
      <div className="mt-20 md:mt-28">
        <motion.div {...fadeUp(0)} className="max-w-xl mb-8 md:mb-10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-4">
            ONE CUSTOMER · ONE PATH
          </p>
          <p className="font-heading text-2xl md:text-[32px] leading-[1.2] font-bold tracking-tight text-[var(--secondary)] text-balance">
            When the systems are connected, nobody re-types anything.
          </p>
        </motion.div>
        <JourneyChain />
      </div>
    </div>
  </section>
);

export default DevelopmentEcosystem;
