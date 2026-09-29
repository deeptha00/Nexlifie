import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { GameScreen, LobbyCard } from './visuals';

const capabilities = [
  'Mobile Games', 'Multiplayer Games', 'Card Games', '2D Games', '3D Experiences', 'Game UI/UX',
  'Game Backend', 'Real-time Multiplayer', 'Leaderboards', 'Rewards', 'Game APIs',
];

const pipeline = ['Concept', 'Design', 'Development', 'Multiplayer', 'Launch'];

const DevelopmentGames = () => (
  <section className="bg-[#0B0B0C] text-white py-20 md:py-32">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <motion.div {...fadeUp(0)} className="lg:col-span-5">
          <Eyebrow tone="dark" className="mb-6">06 / GAME APPLICATIONS</Eyebrow>
          <SectionTitle tone="dark" className="mb-6">
            Turn Ideas Into<br />Playable Experiences.
          </SectionTitle>
          <SectionLead tone="dark" className="max-w-md mb-9">
            We build engaging game applications combining gameplay, design, multiplayer systems and
            modern technology.
          </SectionLead>

          <motion.div
            {...staggerParent(0.04, 0.1)}
            className="grid grid-cols-2 gap-x-6 gap-y-2.5 max-w-md mb-10"
          >
            {capabilities.map((c) => (
              <motion.div
                key={c}
                variants={staggerItem}
                className="flex items-baseline gap-2.5 text-sm text-white/60 font-medium"
              >
                <span className="w-2.5 h-[1px] bg-green-500 shrink-0 translate-y-[-4px]" aria-hidden="true" />
                {c}
              </motion.div>
            ))}
          </motion.div>

          <CTAText to="/services/gaming-applications" tone="dark">Build a Game</CTAText>
        </motion.div>

        <motion.div {...fadeUpScale(0.1)} className="lg:col-span-7 w-full">
          <GameScreen />
          <div className="mt-4">
            <LobbyCard />
          </div>
        </motion.div>
      </div>

      {/* Concept → Launch */}
      <motion.div
        {...staggerParent(0.08, 0.1)}
        className="mt-16 md:mt-20 pt-10 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-3"
      >
        {pipeline.map((step, i) => (
          <motion.div key={step} variants={staggerItem} className="flex items-center gap-4">
            <span className="font-heading text-base md:text-xl font-bold tracking-tight text-white/85">
              {step}
            </span>
            {i < pipeline.length - 1 && (
              <span className="text-green-500 font-mono text-sm" aria-hidden="true">→</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DevelopmentGames;
