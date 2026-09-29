import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale } from '../../lib/motion';
import { CampaignDashboard, ContentCalendarBoard, ReelPlayer, SocialGrid } from './visuals';

/**
 * What the seven services actually produce, shown rather than described.
 * Every number inside the mockups is placeholder UI geometry — nothing here
 * claims a result.
 */
const Caption = ({ kind, job }) => (
  <div className="mb-3">
    <span className="font-mono text-[10px] tracking-[0.2em] text-green-600">{kind}</span>
    <p className="text-sm text-[rgb(var(--ink-rgb)/60%)] mt-1.5 leading-snug">{job}</p>
  </div>
);

const MediaShowcase = () => (
  <section className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">WHAT IT LOOKS LIKE</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] mb-6 text-balance">
          Not a strategy deck.<br />A feed, a funnel, a reel.
        </h2>
        <p className="text-[rgb(var(--ink-rgb)/55%)] text-base md:text-lg font-light leading-relaxed max-w-xl">
          This is the actual shape of the work — the screens your customers see and the
          dashboard you check on a Monday morning.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7">
        <motion.div {...fadeUpScale(0)} className="lg:col-span-4 flex flex-col">
          <Caption kind="SOCIAL" job="A feed built to be followed, not just posted to." />
          <div className="flex-1 flex items-center justify-center">
            <SocialGrid className="w-full max-w-[280px]" />
          </div>
        </motion.div>

        <div className="lg:col-span-8 flex flex-col gap-8 lg:gap-7">
          <motion.div {...fadeUpScale(0.08)}>
            <Caption kind="PERFORMANCE" job="Every campaign judged on cost per lead, not likes." />
            <CampaignDashboard />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-7">
            <motion.div {...fadeUpScale(0.14)} className="sm:col-span-7 flex flex-col">
              <Caption kind="CONTENT CALENDAR" job="Planned weeks out — never a scramble on Monday." />
              <div className="flex-1 flex items-center">
                <ContentCalendarBoard className="w-full" />
              </div>
            </motion.div>
            <motion.div {...fadeUpScale(0.2)} className="sm:col-span-5 flex flex-col">
              <Caption kind="VIDEO & AI VIDEO" job="Built for the scroll, not the boardroom." />
              <div className="flex-1 flex items-center justify-center">
                <ReelPlayer className="w-full max-w-[240px]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MediaShowcase;
