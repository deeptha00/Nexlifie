import { motion } from 'framer-motion';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, CTAText } from './parts';
import { featuredProject, projects } from '../../data/projects';

const Meta = ({ project, tone = 'light' }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
    {project.stack.map((s, i) => (
      <span key={s} className="flex items-center gap-3">
        <span
          className={`font-mono text-[10px] tracking-[0.14em] ${
            tone === 'dark' ? 'text-white/55' : 'text-[rgb(var(--muted-rgb))]'
          }`}
        >
          {s.toUpperCase()}
        </span>
        {i < project.stack.length - 1 && (
          <span className={tone === 'dark' ? 'text-white/20' : 'text-[rgb(var(--ink-rgb)/18%)]'}>·</span>
        )}
      </span>
    ))}
  </div>
);

const Chrome = () => (
  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#111111]/8 bg-[#FBFBFA]" aria-hidden="true">
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/12" />
    <div className="ml-3 h-5 w-1/3 max-w-[200px] rounded-md bg-[#111111]/[0.05]" />
  </div>
);

const FeaturedCase = ({ project }) => (
  <motion.article variants={staggerItem} className="md:col-span-2 group">
    <div className="rounded-2xl overflow-hidden bg-white border border-[#111111]/12 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow duration-500">
      <Chrome />
      <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-[#111111]/5">
        <img
          src={project.images[0]}
          alt={`${project.name} — ${project.category} project built by Nexlifie`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/70">
            01 — {project.category.toUpperCase()}
          </span>
          <h3 className="font-heading text-2xl md:text-4xl font-bold tracking-tight text-white mt-1.5 mb-2">
            {project.name}
          </h3>
          <p className="text-sm md:text-base text-white/75 max-w-md leading-relaxed mb-3">{project.build}</p>
          <Meta project={project} tone="dark" />
        </div>
      </div>
    </div>
  </motion.article>
);

const CaseCard = ({ project, i }) => (
  <motion.article variants={staggerItem} className="group">
    <div className="rounded-2xl overflow-hidden bg-white border border-[#111111]/12 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-500">
      <Chrome />
      <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]/5">
        <img
          src={project.images[0]}
          alt={`${project.name} — ${project.category} project built by Nexlifie`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    </div>

    <div className="pt-5 px-1">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <span className="font-mono text-[11px] text-[rgb(var(--muted-rgb))] shrink-0">
            {String(i + 2).padStart(2, '0')}
          </span>
          <h3 className="font-heading text-lg font-bold tracking-tight text-[var(--secondary)] truncate">
            {project.name}
          </h3>
        </div>
        <span className="text-xs font-medium text-[rgb(var(--muted-rgb))] shrink-0">{project.category}</span>
      </div>
      <p className="text-[13px] text-[rgb(var(--muted-rgb))] leading-relaxed mb-3 pl-7">{project.build}</p>
      <div className="pl-7">
        <Meta project={project} />
      </div>
    </div>
  </motion.article>
);

const DevelopmentFeaturedWork = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/8%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
        <div className="max-w-2xl">
          <Eyebrow className="mb-6">SELECTED WORK</Eyebrow>
          <SectionTitle>Built. Shipped. In the real world.</SectionTitle>
        </div>
        <CTAText to="/clients">See All Work</CTAText>
      </motion.div>

      <motion.div {...staggerParent(0.1)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8">
        <FeaturedCase project={featuredProject} />
        {projects.map((project, i) => (
          <CaseCard key={project.name} project={project} i={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default DevelopmentFeaturedWork;
