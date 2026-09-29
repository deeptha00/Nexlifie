import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import photoCeo from '../../assets/Directors/founder_ceo_mubashir.jpg';
import photoCto from '../../assets/Directors/cofounder_cto_deeptha.jpg';

const directors = [
  {
    name: 'Muhammad Mubashir T',
    role: 'Founder & CEO',
    photo: photoCeo,
    imagePosition: 'center 15%',
    description: "Leading Nexlifie's business vision, strategy and growth with a focus on building meaningful technology solutions for modern businesses.",
    linkedin: 'https://www.linkedin.com/in/muhammadmubashirt?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    profilePath: '/ceo-profile',
  },
  {
    name: 'Deeptha A',
    role: 'Co-Founder & CTO',
    photo: photoCto,
    imagePosition: 'center',
    description: "Driving Nexlifie's technology direction, product development and engineering with a focus on building scalable digital solutions.",
    linkedin: 'https://www.linkedin.com/in/deeptha-a-b9891323a',
    profilePath: '/cto-profile',
  },
];

const DirectorCard = ({ director, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-start text-left max-w-xs"
  >
    <div className="group w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-[rgb(var(--ink-rgb)/10%)] mb-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-500">
      <img
        src={director.photo}
        alt={director.name}
        style={{ objectPosition: director.imagePosition }}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight text-[var(--secondary)] mb-1">
      {director.name}
    </h3>
    <p className="text-[11px] font-mono text-green-600 tracking-[0.2em] mb-4">
      {director.role.toUpperCase()}
    </p>
    <p className="text-[rgb(var(--muted-rgb))] text-sm leading-relaxed mb-5">
      {director.description}
    </p>

    <div className="flex items-center gap-3">
      <a
        href={director.linkedin || '#'}
        target={director.linkedin ? '_blank' : undefined}
        rel="noopener noreferrer"
        aria-label={`${director.name} on LinkedIn`}
        className="w-10 h-10 rounded-full border border-[rgb(var(--ink-rgb)/15%)] flex items-center justify-center text-[rgb(var(--ink-rgb)/60%)] hover:border-green-600 hover:text-green-600 hover:scale-110 transition-all duration-300"
      >
        <Linkedin size={16} />
      </a>
      {director.profilePath && (
        <Link
          to={director.profilePath}
          className="text-xs font-semibold text-green-600 border-b border-green-600/40 pb-0.5 hover:border-green-600 transition-colors duration-300"
        >
          View full profile →
        </Link>
      )}
    </div>
  </motion.div>
);

const Directors = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32 border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mb-14 md:mb-16"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">THE PEOPLE BEHIND NEXLIFIE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold tracking-tight text-[var(--secondary)] text-balance">
          Building the vision together.
        </h2>
      </motion.div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-14 sm:gap-16">
        {directors.map((director, i) => (
          <DirectorCard key={director.name} director={director} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Directors;
