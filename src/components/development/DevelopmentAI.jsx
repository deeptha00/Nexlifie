import { motion } from 'framer-motion';
import { fadeUp, fadeUpScale, staggerParent, staggerItem } from '../../lib/motion';
import { Eyebrow, SectionTitle, SectionLead, CTAText } from './parts';
import { WorkflowTrace } from './visuals';

const capabilities = [
  'AI Assistants',
  'Document Processing',
  'Intelligent Search',
  'Business Automation',
  'AI Customer Support',
  'AI Analytics',
  'Recommendation Systems',
  'Workflow Automation',
  'AI Content Generation',
  'Internal Knowledge Systems',
];

const DevelopmentAI = () => (
  <section className="bg-[rgb(var(--ink-rgb)/2.5%)] py-20 md:py-32 border-y border-[rgb(var(--ink-rgb)/8%)]">
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
        <motion.div {...fadeUp(0)} className="lg:col-span-6">
          <Eyebrow className="mb-6">01 / AI SOLUTIONS</Eyebrow>
          <SectionTitle className="mb-6">
            Put AI to Work<br />Inside Your Business.
          </SectionTitle>
          <SectionLead className="max-w-lg mb-10">
            AI shouldn't just be a chatbot on your website. We integrate AI into real business
            workflows to automate tasks, surface insights and help teams work smarter.
          </SectionLead>

          <motion.div
            {...staggerParent(0.05, 0.1)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-xl mb-10"
          >
            {capabilities.map((c) => (
              <motion.div
                key={c}
                variants={staggerItem}
                className="flex items-baseline gap-2.5 text-sm text-[rgb(var(--ink-rgb)/70%)] font-medium"
              >
                <span className="w-2.5 h-[1px] bg-green-600 shrink-0 translate-y-[-4px]" aria-hidden="true" />
                {c}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp(0.15)}
            className="font-heading text-lg md:text-xl leading-snug font-medium text-[var(--secondary)] max-w-md mb-8 text-balance"
          >
            From AI features to AI-powered business systems, we build practical solutions around
            your goals.
          </motion.p>

          <CTAText to="/services/ai-solutions">Build an AI Solution</CTAText>
        </motion.div>

        <motion.div {...fadeUpScale(0.1)} className="lg:col-span-6 w-full">
          <WorkflowTrace />
        </motion.div>
      </div>
    </div>
  </section>
);

export default DevelopmentAI;
