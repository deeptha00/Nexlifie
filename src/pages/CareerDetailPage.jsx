import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, Clock, MapPin, Users } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { breadcrumbList } from '../lib/seo';
import { fadeUp } from '../lib/motion';
import { getJobById } from '../data/careers';
import { fetchJobStatus } from '../lib/careersApi';
import ApplicationModal from '../components/careers/ApplicationModal';
import { trackPixel } from '../lib/pixel';

const CareerDetailPage = () => {
  const { jobId } = useParams();
  const job = getJobById(jobId);
  const [liveStatus, setLiveStatus] = useState({ counts: {}, closed: [] });
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!job) return;
    trackPixel('ViewContent', {
      content_name: job.title,
      content_category: 'Careers',
      content_ids: [job.id],
      content_type: 'product',
    });
  }, [job]);

  useEffect(() => {
    if (!job) return;
    let cancelled = false;
    fetchJobStatus().then((data) => {
      if (!cancelled) setLiveStatus(data);
    });
    return () => {
      cancelled = true;
    };
  }, [job]);

  if (!job) return <Navigate to="/careers" replace />;

  const appliedCount = liveStatus.counts[job.id] ?? 0;
  const remaining = Math.max(job.maxApplicants - appliedCount, 0);

  const isClosed = job.status === 'closed' || liveStatus.closed.includes(job.id) || appliedCount >= job.maxApplicants;

  const metaItems = [
    { icon: Briefcase, label: job.employmentType },
    { icon: Clock, label: job.experience },
    { icon: MapPin, label: `${job.location} · ${job.workMode}` },
    { icon: Users, label: `${remaining}/${job.maxApplicants} spots left` },
  ];

  return (
    <PageLayout
      title={`${job.title} — Careers at Nexlifie`}
      description={job.shortDescription}
      canonical={`/careers/${job.id}`}
      structuredData={[
        breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }, { name: job.title }]),
        {
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: job.title,
          description: job.description,
          datePosted: job.postedDate,
          employmentType: job.employmentType.toUpperCase().replace('-', '_'),
          hiringOrganization: { '@type': 'Organization', name: 'Nexlifie', sameAs: 'https://nexlifie.com' },
          jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'IN' },
          },
        },
      ]}
    >
      <section className="pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-10">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/careers"
              className="group inline-flex items-center gap-2 text-[rgb(var(--muted-rgb))] hover:text-[var(--secondary)] transition-colors text-xs font-mono tracking-widest mb-10"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              All Openings
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.06)} className="flex items-start justify-between gap-4 mb-4">
            <span className="text-[10px] font-mono tracking-[0.25em] text-green-600 uppercase">{job.department}</span>
            <span
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase ${
                isClosed ? 'bg-[rgb(var(--ink-rgb)/8%)] text-[rgb(var(--muted-rgb))]' : 'bg-green-600/10 text-green-600'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-[rgb(var(--muted-rgb))]' : 'bg-green-600'}`} />
              {isClosed ? 'Closed' : 'Open'}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] text-[var(--secondary)] mb-6 text-balance"
          >
            {job.title}
          </motion.h1>

          <motion.div {...fadeUp(0.16)} className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
            {metaItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[rgb(var(--ink-rgb)/70%)]">
                <Icon size={14} className="text-green-600/70 shrink-0" />
                {label}
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="mb-10">
            {isClosed ? (
              <div className="inline-flex flex-col gap-2">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-sm font-semibold px-7 py-4 rounded-2xl opacity-40 cursor-not-allowed w-fit"
                >
                  Apply Now
                </button>
                <p className="text-xs text-[rgb(var(--muted-rgb))] italic">Applications for this position are currently closed.</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setApplying(true)}
                className="group inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-black transition-colors"
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>

          <motion.div {...fadeUp(0.26)} className="prose-none">
            <p className="text-base text-[rgb(var(--ink-rgb)/80%)] leading-relaxed mb-10">{job.description}</p>

            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-[var(--secondary)] mb-4">Responsibilities</h2>
              <ul className="flex flex-col gap-2.5">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[rgb(var(--ink-rgb)/70%)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-[var(--secondary)] mb-4">Requirements</h2>
              <ul className="flex flex-col gap-2.5">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[rgb(var(--ink-rgb)/70%)] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-xl font-bold text-[var(--secondary)] mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[rgb(var(--ink-rgb)/5%)] border border-[rgb(var(--ink-rgb)/10%)] text-[rgb(var(--ink-rgb)/75%)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {!isClosed && (
              <button
                type="button"
                onClick={() => setApplying(true)}
                className="group inline-flex items-center gap-2 bg-[#111111] text-[#F7F8F6] text-sm font-semibold px-7 py-4 rounded-2xl hover:bg-black transition-colors"
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      <ApplicationModal job={applying ? job : null} onClose={() => setApplying(false)} />
    </PageLayout>
  );
};

export default CareerDetailPage;
