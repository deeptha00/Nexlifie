import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Target, Sparkles, Video, Clapperboard, Users, Share2 } from 'lucide-react';
import { fadeUp, staggerParent, staggerItem } from '../../lib/motion';

/**
 * The seven services Nexlifie Media actually offers. Copy leads with the
 * outcome the client is buying; the bullets underneath are the deliverables.
 * Do not add a service here that the team does not run.
 */
const services = [
  {
    index: '01',
    icon: Target,
    name: 'Digital Marketing',
    outcome: 'Campaigns judged on enquiries, not impressions.',
    description:
      'Paid and organic run together against one goal — qualified demand — with the numbers reported back in language you can act on.',
    items: ['Performance advertising', 'Full-funnel campaign strategy', 'Performance reporting'],
    to: '/services/digital-marketing',
    span: 'lg:col-span-3',
    featured: true,
  },
  {
    index: '02',
    icon: Sparkles,
    name: 'Branding',
    outcome: 'Look like the obvious choice — the company and the founder.',
    description:
      'When two businesses offer the same thing, the more credible one wins. We build that credibility for the company, and for the person in front of it.',
    items: ['Company branding & identity', 'Personal branding for founders', 'Creative direction & guidelines'],
    to: '/services/branding',
    span: 'lg:col-span-3',
    featured: true,
  },
  {
    index: '03',
    icon: Search,
    name: 'SEO',
    outcome: 'Be the result they click when they are already searching.',
    description: 'The highest-intent traffic you will ever get — earned, not rented.',
    items: ['Technical & on-page SEO', 'Keyword & content strategy', 'Local search visibility'],
    to: '/services/seo-optimization',
    span: 'lg:col-span-2',
  },
  {
    index: '04',
    icon: Share2,
    name: 'Social Media Management',
    outcome: 'A feed that stays active, on-brand and worth following.',
    description: 'Planned, produced and published on a schedule — without you chasing anyone for a post.',
    items: ['Content calendars & publishing', 'Platform-native creative', 'Community management'],
    to: '/services/social-media-management',
    span: 'lg:col-span-2',
  },
  {
    index: '05',
    icon: Clapperboard,
    name: 'Video Production',
    outcome: 'Video that sells the thing, not just shows it.',
    description: 'Scripted, shot and edited in-house, built for where it will actually be watched.',
    items: ['Brand & product films', 'Ads, reels & shorts', 'Shoot, edit and deliver'],
    to: '/services/video-production',
    span: 'lg:col-span-2',
  },
  {
    index: '06',
    icon: Video,
    name: 'AI Videos',
    outcome: 'Video volume without a studio behind it.',
    description:
      'AI production lets us turn out more video, faster and cheaper than a shoot — ideal for testing hooks, scaling ads and keeping a channel fed.',
    items: ['AI-generated video & avatars', 'High-volume ad variations', 'Scripts written for the platform'],
    to: '/services/ai-videos',
    span: 'lg:col-span-3',
  },
  {
    index: '07',
    icon: Users,
    name: 'Influencer Marketing',
    outcome: 'Borrow the trust you have not had time to build.',
    description:
      'The right creator puts you in front of an audience that already listens to them — matched, briefed and managed end to end.',
    items: ['Creator sourcing & vetting', 'Briefs & campaign management', 'Deliverables tracked to outcomes'],
    to: '/services/influencer-marketing',
    span: 'lg:col-span-3',
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    <motion.div
      variants={staggerItem}
      className={`group relative ${service.span} rounded-2xl border border-[rgb(var(--ink-rgb)/12%)] bg-[rgb(var(--ink-rgb)/2%)] p-6 md:p-8 flex flex-col hover:border-green-600/40 hover:-translate-y-1 transition-all duration-500`}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 rounded-xl bg-green-600/10 border border-green-600/20 flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors duration-300">
          <Icon size={16} className="text-green-700 group-hover:text-white transition-colors duration-300" />
        </span>
        <span className="font-mono text-xs text-[rgb(var(--ink-rgb)/35%)] tracking-widest">{service.index}</span>
        <h3 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-[var(--secondary)]">
          {service.name}
        </h3>
      </div>

      <p
        className={`font-heading leading-[1.2] font-medium text-[var(--secondary)] mb-3 ${
          service.featured ? 'text-[22px] md:text-[28px]' : 'text-xl md:text-[22px]'
        }`}
      >
        {service.outcome}
      </p>
      <p className="text-[rgb(var(--ink-rgb)/55%)] text-sm md:text-[15px] leading-relaxed mb-6 max-w-md">
        {service.description}
      </p>

      <ul className="space-y-2 mb-6 mt-auto">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] md:text-sm text-[rgb(var(--ink-rgb)/65%)]">
            <span className="w-1 h-1 rounded-full bg-green-600 shrink-0 mt-[7px]" />
            {item}
          </li>
        ))}
      </ul>

      {service.to ? (
        <Link
          to={service.to}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--secondary)] border-b border-[rgb(var(--ink-rgb)/25%)] pb-0.5 self-start hover:border-green-600 hover:text-green-700 transition-colors"
        >
          How it works
          <ArrowUpRight size={14} />
        </Link>
      ) : (
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--ink-rgb)/50%)] self-start hover:text-green-700 transition-colors"
        >
          Talk to us about this
          <ArrowUpRight size={14} />
        </Link>
      )}
    </motion.div>
  );
};

const MediaWhatWeDo = () => (
  <section id="capabilities" className="bg-[var(--bg-dark)] py-20 md:py-32">
    <div className="mx-auto max-w-[1440px] px-6 md:px-10">
      <motion.div {...fadeUp(0)} className="max-w-2xl mb-14 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[1px] bg-green-600" />
          <span className="text-[11px] font-mono tracking-[0.3em] text-[rgb(var(--ink-rgb)/50%)]">WHAT YOU GET</span>
        </div>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-[56px] leading-[1.08] font-semibold tracking-tight text-[var(--secondary)] mb-6 text-balance">
          Seven services.<br />One growth system.
        </h2>
        <p className="text-[rgb(var(--ink-rgb)/55%)] text-base md:text-lg font-light leading-relaxed max-w-xl">
          Take one, or let them feed each other — the brand work makes the ads cheaper,
          the video feeds the social, the SEO keeps compounding after the spend stops.
        </p>
      </motion.div>

      <motion.div {...staggerParent(0.07)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
        {services.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default MediaWhatWeDo;
