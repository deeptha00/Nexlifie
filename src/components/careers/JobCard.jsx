import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Users, ArrowUpRight } from 'lucide-react';

const metaItems = (job, remaining) => [
  { icon: Briefcase, label: job.employmentType },
  { icon: Clock, label: job.experience },
  { icon: MapPin, label: `${job.location} · ${job.workMode}` },
  { icon: Users, label: `${remaining}/${job.maxApplicants} spots left` },
];

/**
 * isClosed combines the static `status` flag from careers.js with the live,
 * server-verified count from Apps Script — either one can close a job.
 * appliedCount is the live count of applications already received for this
 * job (from the same Apps Script source), used to show spots remaining.
 */
const JobCard = ({ job, isClosed, appliedCount = 0, onApply, index = 0 }) => {
  const remaining = Math.max(job.maxApplicants - appliedCount, 0);

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className={`group relative rounded-2xl border border-[rgb(var(--ink-rgb)/12%)] bg-[rgb(var(--ink-rgb)/2%)] p-7 md:p-8 shadow-[var(--shadow-soft)] transition-colors hover:border-green-600/40 ${
      isClosed ? 'opacity-70' : ''
    }`}
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-green-600 uppercase">{job.department}</span>
        <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--secondary)] mt-2">{job.title}</h3>
      </div>
      <span
        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase ${
          isClosed
            ? 'bg-[rgb(var(--ink-rgb)/8%)] text-[rgb(var(--muted-rgb))]'
            : 'bg-green-600/10 text-green-600'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-[rgb(var(--muted-rgb))]' : 'bg-green-600'}`} />
        {isClosed ? 'Closed' : 'Open'}
      </span>
    </div>

    <p className="text-sm text-[rgb(var(--muted-rgb))] leading-relaxed mb-6">{job.shortDescription}</p>

    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-7">
      {metaItems(job, remaining).map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-xs text-[rgb(var(--ink-rgb)/65%)]">
          <Icon size={13} className="text-green-600/70 shrink-0" />
          <span className="truncate">{label}</span>
        </div>
      ))}
    </div>

    {isClosed && (
      <p className="text-xs text-[rgb(var(--muted-rgb))] mb-4 italic">
        Applications for this position are currently closed.
      </p>
    )}

    <div className="flex items-center gap-3">
      <Link
        to={`/careers/${job.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/25%)] pb-0.5 hover:border-green-600 hover:text-green-600 transition-colors"
      >
        View Details
        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
      <button
        type="button"
        disabled={isClosed}
        onClick={() => onApply(job)}
        className="ml-auto inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#111111]"
      >
        Apply Now
      </button>
    </div>
  </motion.div>
  );
};

export default JobCard;
