import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../lib/motion';

import { featuredProject as featured, projects } from '../data/projects';

const BrowserChrome = () => (
  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#111111]/8 bg-white">
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/15" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/15" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/15" />
    <div className="ml-3 h-2.5 w-1/3 rounded-full bg-[#111111]/8" />
  </div>
);

const ImageCarousel = ({ images, aspectClass, zoomOnHover, children, projectName, projectCategory }) => {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActive((a) => (a + dir + images.length) % images.length);
  };

  return (
    <div className={`relative overflow-hidden ${aspectClass} bg-[#111111]/5`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={images[active]}
          alt={`${projectName} — ${projectCategory} project screenshot ${active + 1} of ${images.length}`}
          className={`absolute inset-0 w-full h-full object-cover object-top ${
            zoomOnHover ? 'transition-transform duration-700 group-hover:scale-[1.04]' : ''
          }`}
          initial={{ opacity: 0, scale: zoomOnHover ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        />
      </AnimatePresence>

      {children}

      {hasMultiple && (
        <>
          <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white/90 tracking-wide">
            {active + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={go(-1)}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={go(1)}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActive(i);
                }}
                aria-label={`Show screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const FeaturedCard = ({ project, i }) => (
  <motion.div variants={staggerItem} className="group md:col-span-3">
    <div className="rounded-2xl overflow-hidden bg-white border border-[#111111]/12 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow duration-500">
      <BrowserChrome />
      <ImageCarousel images={project.images} aspectClass="aspect-[16/9] md:aspect-[21/9]" projectName={project.name} projectCategory={project.category}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 md:left-8 pointer-events-none">
          <span className="text-[10px] font-mono text-white/70 tracking-widest">
            {String(i + 1).padStart(2, '0')} — {project.category.toUpperCase()}
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mt-1">{project.name}</h3>
        </div>
      </ImageCarousel>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, i }) => (
  <motion.div variants={staggerItem} className="group">
    <div className="rounded-2xl overflow-hidden bg-white border border-[#111111]/12 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-500">
      <BrowserChrome />
      <ImageCarousel images={project.images} aspectClass="aspect-[16/9]" zoomOnHover projectName={project.name} projectCategory={project.category} />
    </div>
    <div className="flex items-center justify-between mt-4 px-1">
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[11px] text-[rgb(var(--muted-rgb))]">{String(i + 2).padStart(2, '0')}</span>
        <h3 className="font-heading text-lg font-bold text-[var(--secondary)]">{project.name}</h3>
      </div>
      <span className="text-xs font-medium text-[rgb(var(--muted-rgb))] tracking-wide">{project.category}</span>
    </div>
  </motion.div>
);

const Works = () => (
  <section id="works" className="py-20 md:py-32 relative bg-[var(--bg-dark)] border-t border-[rgb(var(--ink-rgb)/10%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <motion.div className="max-w-2xl mb-14 md:mb-16" {...fadeUp(0)}>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--muted-rgb))]">SOME OF OUR WORKS</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[52px] leading-[1.1] font-bold text-[var(--secondary)] text-balance">
          Projects we've<br />brought to life.
        </h2>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" {...staggerParent(0.1)}>
        <FeaturedCard project={featured} i={0} />
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} i={i} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Works;
