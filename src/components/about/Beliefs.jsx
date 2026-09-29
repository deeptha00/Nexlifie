import { motion } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Clarity before complexity',
    desc: 'We believe good technology should simplify problems rather than make them harder to understand.',
  },
  {
    number: '02',
    title: 'Design and engineering belong together',
    desc: 'Great products need both thoughtful experiences and strong technology underneath them.',
  },
  {
    number: '03',
    title: 'Business context matters',
    desc: 'Technology decisions should be connected to the goals, users and realities of the business.',
  },
  {
    number: '04',
    title: 'Build for change',
    desc: 'Digital products should be flexible enough to evolve as businesses and users evolve.',
  },
  {
    number: '05',
    title: 'Long-term thinking',
    desc: 'We aim to create solutions that remain useful beyond the initial launch.',
  },
];

const Beliefs = () => (
  <section className="bg-[#111111] text-white py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12 lg:gap-24">
        <div className="lg:sticky lg:top-24 self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-green-500" />
              <span className="text-[11px] font-mono tracking-[0.3em] text-white/40">WHAT WE BELIEVE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-balance">
              The principles<br />behind the work.
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {principles.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group border-t border-white/12 last:border-b py-8 md:py-10 px-4 -mx-4 rounded-xl hover:bg-white/[0.03] transition-colors duration-500"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-xs text-green-500 tracking-widest shrink-0 group-hover:scale-110 transition-transform duration-300 inline-block">{p.number}</span>
                <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight">{p.title}</h3>
              </div>
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xl pl-9">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Beliefs;
