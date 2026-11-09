import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { jobOpenings } from '../../data/careers';
import { fetchJobStatus } from '../../lib/careersApi';
import JobCard from './JobCard';
import ApplicationModal from './ApplicationModal';

const JobOpenings = () => {
  const [liveStatus, setLiveStatus] = useState({ counts: {}, closed: [] });
  const [applyingTo, setApplyingTo] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchJobStatus().then((data) => {
      if (!cancelled) setLiveStatus(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isJobClosed = (job) => {
    if (job.status === 'closed') return true;
    if (liveStatus.closed.includes(job.id)) return true;
    const liveCount = liveStatus.counts[job.id];
    if (typeof liveCount === 'number' && liveCount >= job.maxApplicants) return true;
    return false;
  };

  const hasAnyJobs = jobOpenings.length > 0;

  return (
    <section id="openings" className="bg-[var(--bg-dark)] py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">CURRENT OPENINGS</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-[44px] leading-[1.1] font-bold tracking-tight text-[var(--secondary)] mb-14 text-balance">
          Open roles right now.
        </h2>

        {hasAnyJobs ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpenings.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                isClosed={isJobClosed(job)}
                appliedCount={liveStatus.counts[job.id] ?? 0}
                onApply={setApplyingTo}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center py-20 border border-dashed border-[rgb(var(--ink-rgb)/15%)] rounded-2xl"
          >
            <Inbox size={32} className="text-[rgb(var(--muted-rgb))] mb-4" />
            <p className="text-[var(--secondary)] font-heading font-bold text-lg mb-1.5">No open positions right now.</p>
            <p className="text-sm text-[rgb(var(--muted-rgb))] max-w-xs">
              We're not hiring at the moment, but check back soon — new roles get posted here first.
            </p>
          </motion.div>
        )}
      </div>

      <ApplicationModal job={applyingTo} onClose={() => setApplyingTo(null)} />
    </section>
  );
};

export default JobOpenings;
