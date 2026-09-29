import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, BrowserFrame } from './parts';

/**
 * Each industry carries the modules we most often build for it — the preview is
 * assembled from these, so it reads as a real screen rather than a stock image.
 */
const industries = [
  {
    name: 'Healthcare',
    desc: 'Patient records, appointments and clinician workflows in one compliant system.',
    modules: ['Appointments', 'Patients', 'Prescriptions', 'Billing'],
    slug: 'healthcare-solutions',
  },
  {
    name: 'Education',
    desc: 'Admissions, batches, attendance and learning content, connected end to end.',
    modules: ['Courses', 'Students', 'Attendance', 'Assessments'],
    slug: 'edtech-solutions',
  },
  {
    name: 'E-commerce',
    desc: 'Storefront, inventory, orders and fulfilment reading from the same stock figure.',
    modules: ['Catalogue', 'Orders', 'Inventory', 'Shipping'],
    slug: 'ecommerce',
  },
  {
    name: 'Real Estate',
    desc: 'Listings, site visits and buyer follow-ups tracked against one pipeline.',
    modules: ['Listings', 'Leads', 'Site visits', 'Documents'],
  },
  {
    name: 'Finance',
    desc: 'Client onboarding, approvals and reporting with an auditable trail.',
    modules: ['Clients', 'Approvals', 'Ledgers', 'Reports'],
  },
  {
    name: 'Retail',
    desc: 'Billing, stock across outlets and loyalty, visible from one dashboard.',
    modules: ['Billing', 'Outlets', 'Stock', 'Loyalty'],
  },
  {
    name: 'Hospitality',
    desc: 'Bookings, housekeeping and guest requests coordinated in real time.',
    modules: ['Bookings', 'Rooms', 'Guests', 'Requests'],
  },
  {
    name: 'Startups',
    desc: 'A first version that is small, real and built to change every week.',
    modules: ['MVP', 'Users', 'Analytics', 'Billing'],
  },
  {
    name: 'Professional Services',
    desc: 'Projects, timesheets and invoices tied to the same client record.',
    modules: ['Clients', 'Projects', 'Timesheets', 'Invoices'],
  },
  {
    name: 'Manufacturing',
    desc: 'Production orders, materials and dispatch tracked from one floor view.',
    modules: ['Orders', 'Materials', 'Production', 'Dispatch'],
  },
  {
    name: 'Gaming',
    desc: 'Gameplay, multiplayer backends, leaderboards and live operations.',
    modules: ['Matches', 'Players', 'Leaderboard', 'Rewards'],
    slug: 'gaming-applications',
  },
];

/** A small, plausible screen assembled from the industry's own modules. */
const IndustryPreview = ({ industry }) => (
  <BrowserFrame label={`${industry.name.toLowerCase().replace(/\s+/g, '')}.platform`}>
    <div className="p-4 md:p-5" aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold text-[#111111]">{industry.name}</p>
        <span className="rounded-md bg-green-600/12 px-2 py-1 font-mono text-[8px] font-semibold text-green-700 leading-none">
          CUSTOM BUILD
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {industry.modules.map((m, i) => (
          <div
            key={m}
            className={`rounded-lg px-2.5 py-2 ${i === 0 ? 'bg-green-600/[0.08]' : 'bg-[#111111]/[0.04]'}`}
          >
            <p
              className={`text-[9px] font-semibold leading-none mb-2 ${
                i === 0 ? 'text-green-700' : 'text-[#111111]/55'
              }`}
            >
              {m}
            </p>
            <div className={`h-1.5 rounded-full ${i === 0 ? 'w-3/5 bg-green-600/40' : 'w-2/5 bg-[#111111]/12'}`} />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#111111]/8 p-3">
        <div className="h-1.5 w-12 rounded-full bg-[#111111]/12 mb-3" />
        <div className="flex items-end gap-1 h-10">
          {[42, 64, 50, 78, 58, 88].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-[2px] ${i === 5 ? 'bg-green-600' : 'bg-[#111111]/12'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

const DevelopmentIndustries = () => {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/8%)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-20">
          <Eyebrow className="mb-6">WHO WE BUILD FOR</Eyebrow>
          <SectionTitle className="mb-6">
            Built for Businesses<br />That Don't Fit Into a Template.
          </SectionTitle>
          <SectionLead className="max-w-xl">
            The closer a business is to its own way of working, the less a packaged product fits.
            That is usually the point at which people call us.
          </SectionLead>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* The list */}
          <div className="lg:col-span-7">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                {...fadeUp(Math.min(i, 6) * 0.04, 16)}
                onMouseEnter={() => setActive(i)}
                className={`group flex items-center gap-4 border-t border-[rgb(var(--ink-rgb)/10%)] last:border-b last:border-[rgb(var(--ink-rgb)/10%)] transition-colors duration-300 ${
                  active === i ? 'lg:bg-[rgb(var(--ink-rgb)/2%)]' : ''
                }`}
              >
                <button
                  type="button"
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="flex-1 text-left py-5 md:py-6 pl-1 pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 rounded-lg"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] text-[rgb(var(--muted-rgb))] shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`font-heading text-xl sm:text-2xl md:text-[28px] font-bold tracking-tight transition-colors duration-300 ${
                        active === i ? 'text-green-700' : 'text-[var(--secondary)]'
                      }`}
                    >
                      {industry.name}
                    </h3>
                  </div>
                  {/* On small screens there is no hover, so the detail stays visible. */}
                  <p className="lg:hidden text-[13px] text-[rgb(var(--muted-rgb))] leading-relaxed mt-2 pl-8">
                    {industry.desc}
                  </p>
                </button>

                {industry.slug && (
                  <Link
                    to={`/services/${industry.slug}`}
                    aria-label={`${industry.name} services`}
                    className="shrink-0 p-2 mr-1 rounded-lg text-[rgb(var(--ink-rgb)/25%)] hover:text-green-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* The preview — desktop only, driven by the list */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <IndustryPreview industry={current} />
                <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed mt-5">{current.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentIndustries;
