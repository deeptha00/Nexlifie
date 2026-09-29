import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

const pains = [
  {
    pain: 'You post every week and nothing converts.',
    fix: 'Content with no strategy behind it fills a feed, not a pipeline. We plan the path from post to enquiry first.',
  },
  {
    pain: "You can't say where your last ten leads came from.",
    fix: 'We report on what each channel brought in, so you know which spend to keep and which to kill.',
  },
  {
    pain: 'Your agency sends reports you can act on — never.',
    fix: 'Ours open with what changed, what it cost, and what we are doing differently next month. In plain language.',
  },
  {
    pain: 'Four freelancers own four pieces. Nobody owns the result.',
    fix: 'One team, one strategy, one person accountable for the number at the bottom of the report.',
  },
];

const MediaPainPoints = () => (
  <section className="bg-[#111111] text-[#F7F8F6] py-20 md:py-28">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-500" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-white/40">SOUND FAMILIAR?</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-balance">
          Most marketing budgets<br />leak in the same four places.
        </h2>
      </motion.div>

      <motion.div {...staggerParent(0.08)} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 md:gap-y-12">
        {pains.map((p) => (
          <motion.div
            key={p.pain}
            variants={staggerItem}
            className="group border-t border-white/12 pt-7 hover:border-green-500/50 transition-colors duration-500"
          >
            <p className="font-heading text-xl md:text-2xl font-medium leading-snug mb-4 max-w-md">
              &ldquo;{p.pain}&rdquo;
            </p>
            <div className="flex items-start gap-3 max-w-md">
              <ArrowDown size={15} className="text-green-500 shrink-0 mt-1 rotate-[-45deg] group-hover:translate-x-0.5 transition-transform" />
              <p className="text-sm md:text-[15px] text-white/50 leading-relaxed">{p.fix}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default MediaPainPoints;
