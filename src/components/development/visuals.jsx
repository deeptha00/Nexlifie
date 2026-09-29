import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Bell, Boxes, Check, Home, LayoutGrid,
  Search, Settings, User, Users,
} from 'lucide-react';
import { fadeUp } from '../../lib/motion';
import { BrowserFrame, PhoneFrame } from './parts';

/**
 * Signature interface visuals for the Development page and the six capability
 * pages. They live here so both use one implementation: the dashboard a visitor
 * sees on /development is the same component as on /services/web-applications.
 *
 * The interiors are deliberately light in both themes — a screenshot of a
 * product should read as a screenshot, not as page chrome.
 */


/* ── AI: the workflow run ────────────────────────────────────── */

/* One real chain of events, the way it actually runs. */
const trace = [
  { step: 'Customer question', detail: '“Where is my order?”', kind: 'input' },
  { step: 'AI understands', detail: 'Intent: order status · identifies customer' },
  { step: 'Checks business data', detail: 'Reads orders, inventory, delivery status' },
  { step: 'Takes action', detail: 'Drafts the reply, flags the delayed item' },
  { step: 'Updates CRM', detail: 'Logs the conversation against the account' },
  { step: 'Notifies team', detail: 'Ops gets the exception, not the routine' },
];

const TraceRow = ({ item, i, last }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: 0.15 + i * 0.12 }}
    className="relative flex gap-3.5 md:gap-4"
  >
    {/* rail */}
    <div className="relative flex flex-col items-center shrink-0">
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          item.kind === 'input' ? 'bg-[#111111]' : 'bg-green-600'
        }`}
      >
        {item.kind === 'input' ? (
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        ) : (
          <Check size={11} className="text-white" strokeWidth={3} />
        )}
      </span>
      {!last && <span className="w-[1px] flex-1 min-h-[26px] bg-[#111111]/12 my-1" />}
    </div>

    <div className={last ? 'pb-0' : 'pb-4 md:pb-5'}>
      <p className="text-[13px] md:text-sm font-semibold text-[#111111] leading-tight">{item.step}</p>
      <p className="text-[11px] md:text-xs text-[#111111]/50 mt-1 leading-relaxed">{item.detail}</p>
    </div>

    <span className="ml-auto font-mono text-[9px] text-[#111111]/25 shrink-0 pt-1">
      {String(i + 1).padStart(2, '0')}
    </span>
  </motion.div>
);

export const WorkflowTrace = () => (
  <BrowserFrame label="workflows / customer-support">
    <div className="p-5 md:p-7">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#111111]/8">
        <div>
          <p className="text-[11px] font-semibold text-[#111111]/70 leading-none mb-1.5">Support workflow</p>
          <p className="font-mono text-[9px] text-[#111111]/35">RUN · AUTOMATED</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-green-600/10 px-2.5 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
          <span className="font-mono text-[9px] font-semibold text-green-700 tracking-wide">COMPLETED</span>
        </span>
      </div>

      {trace.map((item, i) => (
        <TraceRow key={item.step} item={item} i={i} last={i === trace.length - 1} />
      ))}
    </div>
  </BrowserFrame>
);

/* ── Custom software: the system hub ─────────────────────────── */

/* Every module we commonly fold into one platform, and what it actually does. */
const nodes = [
  { label: 'Sales', detail: 'Quotes, orders and targets, tied to the same customer record your team already uses.' },
  { label: 'CRM', detail: 'Leads, conversations and follow-ups in one timeline instead of five inboxes.' },
  { label: 'HRMS', detail: 'Attendance, leave, payroll inputs and employee records, on one roster.' },
  { label: 'Inventory', detail: 'Stock levels that update when a sale happens — not at the end of the week.' },
  { label: 'Finance', detail: 'Invoices, payments and receivables reading from live sales data.' },
  { label: 'Operations', detail: 'Your day-to-day process, mapped as it runs, with the approvals you already use.' },
  { label: 'Projects', detail: 'Tasks, owners and deadlines connected to the client and the invoice.' },
  { label: 'Customers', detail: 'A portal where your customers check their own orders, tickets and documents.' },
  { label: 'Reporting', detail: 'The reports you build by hand today, generated from one dataset.' },
  { label: 'Analytics', detail: 'Trends across sales, operations and finance, because they share a database.' },
  { label: 'Alerts', detail: 'The right person notified when stock runs low or an approval is waiting.' },
  { label: 'AI', detail: 'Automation and insight layered on top of data that is finally in one place.' },
];

const RADIUS = 38;
const positions = nodes.map((_, i) => {
  const angle = (-90 + i * (360 / nodes.length)) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
});

const RadialHub = ({ active, setActive }) => (
  <div className="relative w-full max-w-[560px] aspect-square mx-auto">
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
      {positions.map((pos, i) => (
        <motion.line
          key={i}
          x1={50}
          y1={50}
          x2={pos.x}
          y2={pos.y}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 + i * 0.04, ease: 'easeOut' }}
          stroke={active === i ? '#16a34a' : 'rgb(var(--ink-rgb) / 0.14)'}
          strokeWidth={active === i ? 0.55 : 0.3}
        />
      ))}
    </svg>

    {/* the platform itself */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[142px] md:w-[168px] rounded-2xl bg-[#111111] text-white px-4 py-4 md:px-5 md:py-5 text-center shadow-[0_24px_50px_-20px_rgba(17,17,17,0.5)]">
      <p className="font-mono text-[9px] tracking-[0.18em] text-white/40 mb-1.5">ONE SYSTEM</p>
      <p className="font-heading text-sm md:text-base font-bold tracking-tight leading-tight">
        Your Custom Platform
      </p>
    </div>

    {nodes.map((node, i) => (
      <button
        key={node.label}
        type="button"
        onMouseEnter={() => setActive(i)}
        onFocus={() => setActive(i)}
        onClick={() => setActive(i)}
        aria-pressed={active === i}
        className={`absolute -translate-x-1/2 -translate-y-1/2 w-[88px] lg:w-[98px] rounded-xl border px-2 py-2.5 text-center transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 ${
          active === i
            ? 'border-green-600 bg-green-600/[0.07]'
            : 'border-[rgb(var(--ink-rgb)/12%)] bg-[var(--bg-dark)] hover:border-[rgb(var(--ink-rgb)/30%)]'
        }`}
        style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
      >
        <span
          className={`text-[11px] lg:text-xs font-semibold leading-tight ${
            active === i ? 'text-green-700' : 'text-[rgb(var(--ink-rgb)/70%)]'
          }`}
        >
          {node.label}
        </span>
      </button>
    ))}
  </div>
);

const NodeGrid = ({ active, setActive }) => (
  <div>
    <div className="rounded-2xl bg-[#111111] text-white px-5 py-4 text-center mb-4">
      <p className="font-mono text-[9px] tracking-[0.18em] text-white/40 mb-1">ONE SYSTEM</p>
      <p className="font-heading text-base font-bold tracking-tight">Your Custom Platform</p>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {nodes.map((node, i) => (
        <button
          key={node.label}
          type="button"
          onClick={() => setActive(i)}
          aria-pressed={active === i}
          className={`rounded-xl border px-2 py-2.5 text-[11px] font-semibold leading-tight transition-colors ${
            active === i
              ? 'border-green-600 bg-green-600/[0.07] text-green-700'
              : 'border-[rgb(var(--ink-rgb)/12%)] text-[rgb(var(--ink-rgb)/70%)]'
          }`}
        >
          {node.label}
        </button>
      ))}
    </div>
  </div>
);

/**
 * The twelve-module hub, diagram plus detail panel, owning its own selection.
 * Radial at md+, a tappable grid below that — twelve labels cannot sit on a
 * circle at phone width without colliding.
 */
export const SystemHub = () => {
  const [active, setActive] = useState(null);
  const current = active === null ? null : nodes[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <div className="lg:col-span-7">
        <div className="hidden md:block">
          <RadialHub active={active} setActive={setActive} />
        </div>
        <div className="md:hidden">
          <NodeGrid active={active} setActive={setActive} />
        </div>
      </div>

      <motion.div {...fadeUp(0.1)} className="lg:col-span-5">
        <div className="lg:min-h-[168px] rounded-2xl border border-[rgb(var(--ink-rgb)/10%)] bg-[rgb(var(--ink-rgb)/1.5%)] p-6 md:p-7">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--muted-rgb))] mb-4">
            {current ? 'MODULE' : 'THE IDEA'}
          </p>
          {current ? (
            <>
              <p className="font-heading text-2xl font-bold tracking-tight text-[var(--secondary)] mb-3">
                {current.label}
              </p>
              <p className="text-sm md:text-[15px] text-[rgb(var(--muted-rgb))] leading-relaxed">
                {current.detail}
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-2xl font-bold tracking-tight text-[var(--secondary)] mb-3">
                Twelve modules, one database.
              </p>
              <p className="text-sm md:text-[15px] text-[rgb(var(--muted-rgb))] leading-relaxed">
                These don't have to be twelve separate purchases. Select any module to see how it
                fits into a single platform built for you.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ── One consolidated platform interface ─────────────────────── */

const platformModules = [
  'CRM', 'HRMS', 'Sales', 'Inventory', 'Operations',
  'Finance', 'Reports', 'Notifications', 'Customer Management', 'AI Automation',
];

/* One real interface: every module in one left rail. */
export const PlatformUI = () => (
  <BrowserFrame label="platform.yourcompany.com">
    <div className="flex min-h-[380px] md:min-h-[440px]">
      {/* module rail */}
      <div className="w-[38%] sm:w-[34%] md:w-[30%] border-r border-[#111111]/8 bg-[#FBFBFA] p-3 md:p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-5 h-5 rounded-md bg-[#111111]" />
          <div className="h-2 w-12 rounded-full bg-[#111111]/15" />
        </div>
        <div className="flex flex-col gap-0.5">
          {platformModules.map((m, i) => (
            <motion.div
              key={m}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className={`rounded-md px-2 py-[7px] text-[10px] md:text-[11px] font-medium leading-tight ${
                i === 0 ? 'bg-green-600 text-white' : 'text-[#111111]/60'
              }`}
            >
              {m}
            </motion.div>
          ))}
        </div>
      </div>

      {/* work area */}
      <div className="flex-1 p-4 md:p-6" aria-hidden="true">
        <div className="flex items-center justify-between mb-5">
          <div className="h-3 w-24 rounded-full bg-[#111111]/15" />
          <div className="flex gap-1.5">
            <div className="h-6 w-14 rounded-lg bg-[#111111]/[0.06]" />
            <div className="h-6 w-14 rounded-lg bg-green-600" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5">
          {['Pipeline', 'Open tasks', 'This month'].map((label) => (
            <div key={label} className="rounded-lg bg-[#111111]/[0.035] p-2.5 md:p-3">
              <p className="text-[8px] md:text-[9px] font-medium text-[#111111]/45 mb-2 leading-none">{label}</p>
              <div className="h-3 w-3/5 rounded-full bg-[#111111]/20 mb-1.5" />
              <div className="h-1.5 w-2/5 rounded-full bg-green-600/35" />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[#111111]/8 p-3 md:p-4 mb-4">
          <div className="h-2 w-16 rounded-full bg-[#111111]/12 mb-4" />
          <svg viewBox="0 0 220 56" className="w-full h-12 md:h-14">
            <polyline
              points="0,44 28,36 56,39 84,22 112,27 140,14 168,20 196,9 220,12"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600/50 shrink-0" />
              <div className="h-1.5 rounded-full bg-[#111111]/10" style={{ width: `${72 - i * 14}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/* ── Mobile: customer app + business app ─────────────────────── */

const StatusBar = () => (
  <div className="flex items-center justify-between px-4 pt-3.5 pb-1" aria-hidden="true">
    <span className="font-mono text-[9px] font-semibold text-[#111111]/55">9:41</span>
    <div className="flex items-center gap-[3px]">
      <span className="w-[3px] h-[6px] rounded-sm bg-[#111111]/30" />
      <span className="w-[3px] h-[8px] rounded-sm bg-[#111111]/40" />
      <span className="w-[3px] h-[10px] rounded-sm bg-[#111111]/55" />
      <span className="ml-1 w-4 h-[8px] rounded-[2px] border border-[#111111]/35 p-[1px]">
        <span className="block w-2/3 h-full rounded-[1px] bg-[#111111]/50" />
      </span>
    </div>
  </div>
);

const TabBar = ({ icons }) => (
  <div className="flex items-center justify-around border-t border-[#111111]/8 px-4 py-3 bg-[#FBFBFA]" aria-hidden="true">
    {icons.map(([Icon, isActive], i) => (
      <Icon key={i} size={16} className={isActive ? 'text-green-600' : 'text-[#111111]/25'} />
    ))}
  </div>
);

/* A customer-facing app: browse, choose, book. */
export const CustomerApp = () => (
  <PhoneFrame>
    <div className="flex flex-col aspect-[9/19]">
      <StatusBar />
      <div className="px-4 pt-3 pb-4 flex-1 overflow-hidden" aria-hidden="true">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] text-[#111111]/40 leading-none mb-1.5">Good morning</p>
            <p className="text-[13px] font-bold text-[#111111] leading-none">Your account</p>
          </div>
          <span className="w-7 h-7 rounded-full bg-[#111111]/[0.07]" />
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#111111]/[0.05] px-3 py-2.5 mb-4">
          <Search size={12} className="text-[#111111]/35" />
          <div className="h-1.5 w-20 rounded-full bg-[#111111]/12" />
        </div>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className={`w-9 h-9 rounded-xl ${i === 0 ? 'bg-green-600/15' : 'bg-[#111111]/[0.05]'}`} />
              <span className="h-1 w-5 rounded-full bg-[#111111]/12" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-2.5">
          <div className="h-2 w-16 rounded-full bg-[#111111]/15" />
          <div className="h-1.5 w-8 rounded-full bg-green-600/40" />
        </div>

        <div className="flex flex-col gap-2.5">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-2.5 rounded-xl border border-[#111111]/8 p-2.5">
              <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#111111]/[0.09] to-green-600/10 shrink-0" />
              <div className="flex-1 pt-0.5">
                <div className="h-2 w-3/4 rounded-full bg-[#111111]/15 mb-2" />
                <div className="h-1.5 w-1/2 rounded-full bg-[#111111]/8 mb-2.5" />
                <div className="flex items-center justify-between">
                  <div className="h-2 w-10 rounded-full bg-[#111111]/20" />
                  <span className="rounded-md bg-green-600 px-2 py-1 text-[7px] font-bold text-white leading-none">
                    BOOK
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar icons={[[Home, true], [Search, false], [Bell, false], [User, false]]} />
    </div>
  </PhoneFrame>
);

/* The same business, seen from the inside. */
export const BusinessApp = () => (
  <PhoneFrame>
    <div className="flex flex-col aspect-[9/19]">
      <StatusBar />
      <div className="px-4 pt-3 pb-4 flex-1 overflow-hidden" aria-hidden="true">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] font-bold text-[#111111] leading-none">Today</p>
          <span className="rounded-md bg-[#111111] px-2 py-1 font-mono text-[7px] font-semibold text-white leading-none">
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {['Orders', 'Pending'].map((label, i) => (
            <div key={label} className="rounded-xl bg-[#111111]/[0.04] p-2.5">
              <p className="text-[8px] text-[#111111]/40 mb-2 leading-none">{label}</p>
              <div className={`h-3 w-2/3 rounded-full ${i === 0 ? 'bg-green-600/45' : 'bg-[#111111]/20'}`} />
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-[#111111]/8 p-3 mb-4">
          <div className="h-1.5 w-12 rounded-full bg-[#111111]/12 mb-3" />
          <div className="flex items-end gap-1.5 h-16">
            {[38, 56, 44, 72, 50, 84, 62].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-[3px] ${i === 5 ? 'bg-green-600' : 'bg-[#111111]/12'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-lg bg-[#111111]/[0.03] px-2.5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
              <div className="h-1.5 rounded-full bg-[#111111]/12" style={{ width: `${68 - i * 12}%` }} />
            </div>
          ))}
        </div>
      </div>
      <TabBar icons={[[LayoutGrid, true], [BarChart3, false], [Bell, false], [User, false]]} />
    </div>
  </PhoneFrame>
);

/** The pair as shown on both pages: customer-facing app beside the internal one. */
export const PhonePair = () => (
  <div className="flex justify-center gap-4 sm:gap-6">
    <div className="w-[46%] max-w-[232px] lg:mt-10">
      <CustomerApp />
    </div>
    <div className="w-[46%] max-w-[232px]">
      <BusinessApp />
    </div>
  </div>
);

/* ── Web apps: operations dashboard ──────────────────────────── */

const kpis = [
  { label: 'Active accounts', bar: 'w-3/5', accent: true },
  { label: 'Open pipeline', bar: 'w-2/5', accent: false },
  { label: 'Tasks due', bar: 'w-1/2', accent: false },
  { label: 'Fulfilment rate', bar: 'w-4/5', accent: true },
];

const rows = [
  { status: 'Active', tone: 'green' },
  { status: 'Review', tone: 'neutral' },
  { status: 'Active', tone: 'green' },
  { status: 'Queued', tone: 'neutral' },
  { status: 'Active', tone: 'green' },
];

export const Dashboard = () => (
  <BrowserFrame label="app.yourcompany.com/dashboard">
    <div className="flex" aria-hidden="true">
      {/* icon rail */}
      <div className="hidden sm:flex w-14 shrink-0 flex-col items-center gap-5 border-r border-[#111111]/8 bg-[#FBFBFA] py-5">
        <span className="w-7 h-7 rounded-lg bg-[#111111]" />
        {[LayoutGrid, Users, Boxes, BarChart3, Settings].map((Icon, i) => (
          <Icon key={i} size={15} className={i === 0 ? 'text-green-600' : 'text-[#111111]/25'} />
        ))}
      </div>

      <div className="flex-1 min-w-0">
        {/* app header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#111111]/8 px-4 md:px-6 py-3.5">
          <div className="flex items-center gap-4 min-w-0">
            <p className="text-[11px] md:text-[13px] font-bold text-[#111111] whitespace-nowrap">Operations</p>
            <div className="hidden md:flex items-center gap-3">
              {['Overview', 'Customers', 'Orders', 'Reports'].map((t, i) => (
                <span
                  key={t}
                  className={`text-[10px] font-medium ${i === 0 ? 'text-green-700' : 'text-[#111111]/40'}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:block rounded-md bg-[#111111]/[0.05] px-2.5 py-1.5 text-[9px] font-medium text-[#111111]/45">
              Last 30 days
            </span>
            <span className="w-6 h-6 rounded-full bg-[#111111]/[0.09]" />
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 mb-4 md:mb-5">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl border border-[#111111]/8 p-3 md:p-3.5">
                <p className="text-[8px] md:text-[9px] font-medium text-[#111111]/45 mb-2.5 leading-none">
                  {k.label}
                </p>
                <div className="h-3.5 w-3/5 rounded-full bg-[#111111]/[0.14] mb-2" />
                <div className={`h-1.5 rounded-full ${k.bar} ${k.accent ? 'bg-green-600/50' : 'bg-[#111111]/12'}`} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 md:gap-3">
            {/* chart */}
            <div className="lg:col-span-2 rounded-xl border border-[#111111]/8 p-3.5 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="h-2 w-20 rounded-full bg-[#111111]/12" />
                <div className="flex gap-1.5">
                  <span className="w-8 h-4 rounded bg-green-600/15" />
                  <span className="w-8 h-4 rounded bg-[#111111]/[0.06]" />
                </div>
              </div>
              <svg viewBox="0 0 320 92" className="w-full h-20 md:h-28">
                <defs>
                  <linearGradient id="devWebAppArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 23, 46, 69].map((y) => (
                  <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#111111" strokeOpacity="0.06" strokeWidth="1" />
                ))}
                <path
                  d="M0,74 L40,62 L80,66 L120,44 L160,50 L200,28 L240,34 L280,16 L320,22 L320,92 L0,92 Z"
                  fill="url(#devWebAppArea)"
                />
                <polyline
                  points="0,74 40,62 80,66 120,44 160,50 200,28 240,34 280,16 320,22"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="280" cy="16" r="3.5" fill="#16a34a" />
              </svg>
            </div>

            {/* side list */}
            <div className="rounded-xl border border-[#111111]/8 p-3.5 md:p-5">
              <div className="h-2 w-14 rounded-full bg-[#111111]/12 mb-4" />
              <div className="flex flex-col gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-[#111111]/[0.05] shrink-0" />
                    <div className="flex-1">
                      <div className="h-1.5 rounded-full bg-[#111111]/12 mb-1.5" style={{ width: `${80 - i * 9}%` }} />
                      <div className="h-1 w-1/3 rounded-full bg-[#111111]/[0.07]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* table */}
          <div className="mt-2.5 md:mt-3 rounded-xl border border-[#111111]/8 overflow-hidden">
            <div className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] gap-3 border-b border-[#111111]/8 bg-[#FBFBFA] px-3.5 md:px-5 py-2.5">
              {['Customer', 'Owner', 'Stage', 'Status'].map((h) => (
                <span key={h} className="text-[8px] md:text-[9px] font-semibold uppercase tracking-wider text-[#111111]/40">
                  {h}
                </span>
              ))}
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] gap-3 items-center px-3.5 md:px-5 py-2.5 md:py-3 border-b border-[#111111]/5 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#111111]/[0.07] shrink-0" />
                  <div className="h-1.5 rounded-full bg-[#111111]/12" style={{ width: `${74 - i * 7}%` }} />
                </div>
                <div className="h-1.5 w-2/3 rounded-full bg-[#111111]/[0.09]" />
                <div className="h-1.5 w-1/2 rounded-full bg-[#111111]/[0.09]" />
                <span
                  className={`justify-self-start rounded-md px-2 py-1 text-[8px] font-semibold leading-none ${
                    row.tone === 'green' ? 'bg-green-600/12 text-green-700' : 'bg-[#111111]/[0.06] text-[#111111]/45'
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/* ── Websites: three jobs ────────────────────────────────────── */

/* Corporate — credibility first: who you are, what you do, proof. */
export const CorporateSite = () => (
  <BrowserFrame label="yourcompany.com" bodyClass="bg-white">
    <div aria-hidden="true">
      <div className="flex items-center justify-between px-5 md:px-7 py-3.5 border-b border-[#111111]/6">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#111111]" />
          <div className="h-2 w-14 rounded-full bg-[#111111]/15" />
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1.5 w-9 rounded-full bg-[#111111]/10" />
          ))}
          <span className="h-6 w-16 rounded-lg bg-[#111111]" />
        </div>
      </div>

      <div className="px-5 md:px-7 py-7 md:py-10">
        <div className="max-w-[78%]">
          <div className="h-1.5 w-20 rounded-full bg-green-600/50 mb-4" />
          <div className="h-4 md:h-5 w-full rounded-full bg-[#111111]/[0.16] mb-2.5" />
          <div className="h-4 md:h-5 w-4/5 rounded-full bg-[#111111]/[0.16] mb-4" />
          <div className="h-2 w-3/5 rounded-full bg-[#111111]/[0.08] mb-6" />
          <div className="flex gap-2">
            <span className="h-7 w-24 rounded-lg bg-green-600" />
            <span className="h-7 w-20 rounded-lg border border-[#111111]/12" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 px-5 md:px-7 pb-7 md:pb-9">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <span className="block w-8 h-8 rounded-lg bg-green-600/12 mb-3" />
            <div className="h-2 w-3/4 rounded-full bg-[#111111]/14 mb-2" />
            <div className="h-1.5 w-full rounded-full bg-[#111111]/[0.07] mb-1.5" />
            <div className="h-1.5 w-2/3 rounded-full bg-[#111111]/[0.07]" />
          </div>
        ))}
      </div>

      <div className="bg-[#111111] px-5 md:px-7 py-5 flex items-center justify-between">
        <div className="h-1.5 w-16 rounded-full bg-white/20" />
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-4 h-4 rounded-full bg-white/12" />
          ))}
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/* E-commerce — the shortest possible path from browse to buy. */
export const EcommerceSite = () => (
  <BrowserFrame label="shop.yourbrand.com">
    <div aria-hidden="true">
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-[#111111]/6">
        <div className="h-2 w-12 rounded-full bg-[#111111]/15" />
        <div className="flex-1 mx-4 h-5 rounded-md bg-[#111111]/[0.05]" />
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#111111]/[0.09]" />
          <span className="relative w-4 h-4 rounded-full bg-green-600/15">
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-600" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 md:px-5 py-2.5 border-b border-[#111111]/6 overflow-hidden">
        {['All', 'New', 'Sale', 'Gifts'].map((t, i) => (
          <span
            key={t}
            className={`rounded-md px-2 py-1 text-[8px] font-semibold leading-none whitespace-nowrap ${
              i === 0 ? 'bg-[#111111] text-white' : 'bg-[#111111]/[0.05] text-[#111111]/45'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5 md:gap-3 p-4 md:p-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-[#111111]/[0.08] to-green-600/[0.07] mb-2" />
            <div className="h-1.5 w-full rounded-full bg-[#111111]/12 mb-1.5" />
            <div className="flex items-center justify-between">
              <div className="h-2 w-8 rounded-full bg-[#111111]/18" />
              <span className="rounded bg-green-600 px-1.5 py-[3px] text-[6px] font-bold text-white leading-none">
                ADD
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

/* Product / startup — one idea, stated once, with a single action. */
export const ProductSite = () => (
  <BrowserFrame label="yourproduct.io" bodyClass="bg-[#0E0F0E]">
    <div aria-hidden="true">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-500" />
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>
        <span className="h-6 w-16 rounded-lg bg-white/[0.09]" />
      </div>

      <div className="px-5 pt-9 pb-7 text-center">
        <div className="h-1.5 w-16 rounded-full bg-green-500/60 mx-auto mb-4" />
        <div className="h-4 w-4/5 rounded-full bg-white/[0.18] mx-auto mb-2.5" />
        <div className="h-4 w-3/5 rounded-full bg-white/[0.18] mx-auto mb-4" />
        <div className="h-1.5 w-2/5 rounded-full bg-white/[0.09] mx-auto mb-6" />
        <span className="inline-block h-8 w-28 rounded-xl bg-green-500" />
      </div>

      <div className="px-5 pb-6">
        <div className="rounded-t-xl border border-white/[0.09] border-b-0 bg-white/[0.03] p-3">
          <div className="flex gap-1.5 mb-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/15" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-white/[0.05] p-2">
                <div className="h-1 w-2/3 rounded-full bg-white/15 mb-2" />
                <div className={`h-2 w-1/2 rounded-full ${i === 0 ? 'bg-green-500/60' : 'bg-white/12'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/* ── Games ───────────────────────────────────────────────────── */

/* The game screen and match lobby live in gameVisuals.jsx — they run rather
   than sit still, so they carry state and animation these stills do not. */
export { GameScreen, LobbyCard } from './gameVisuals';
