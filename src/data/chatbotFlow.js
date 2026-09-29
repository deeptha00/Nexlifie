/**
 * The Nexlifie site assistant's conversation tree.
 *
 * This is a guided, button-driven bot — no AI, no backend, nothing invented.
 * Every option is one of:
 *   - `next`:     move to another node in this tree (re-shows that node's bot lines)
 *   - `href`:     a real page or in-page anchor on this site (verified to exist —
 *                 check for a matching `id="..."` or route before adding a new one)
 *   - `external`: an outside link (currently just WhatsApp)
 *
 * Keep the copy honest and specific, in the site's existing voice — this is the
 * same standard the rest of the site holds to: no fabricated numbers, no promises
 * about pricing or timelines we have not actually confirmed.
 */
export const chatbotFlow = {
  start: {
    bot: [
      "Hi, I'm the Nexlifie assistant.",
      "I'm not AI — just a quick way to find the right page. What are you here for?",
    ],
    options: [
      { label: 'Build something', next: 'buildMenu' },
      { label: 'Grow or market a business', next: 'growMenu' },
      { label: 'See real work we’ve built', href: '/clients' },
      { label: 'How pricing & process work', next: 'pricing' },
      { label: 'Talk to a person', next: 'human' },
    ],
  },

  buildMenu: {
    bot: ['What kind of project is it?'],
    options: [
      { label: 'A website', href: '/services/website-development' },
      { label: 'A mobile app — Android or iOS', href: '/services/mobile-apps' },
      { label: 'A web application or business platform', href: '/services/web-applications' },
      { label: 'Custom business software', href: '/services/custom-software' },
      { label: 'An AI solution', href: '/services/ai-solutions' },
      { label: 'A game', href: '/services/gaming-applications' },
      { label: 'Not sure yet — show me everything', href: '/development' },
      { label: '← Back', next: 'start' },
    ],
  },

  growMenu: {
    bot: ['Which of these fits best?'],
    options: [
      { label: 'Digital marketing / ads', href: '/services/digital-marketing' },
      { label: 'SEO', href: '/services/seo-optimization' },
      { label: 'Branding', href: '/services/branding' },
      { label: 'Social media management', href: '/services/social-media-management' },
      { label: 'Video & AI video', href: '/services/video-production' },
      { label: 'Influencer marketing', href: '/services/influencer-marketing' },
      { label: 'Not sure — build me a plan', href: '/media#stack-builder' },
      { label: '← Back', next: 'start' },
    ],
  },

  pricing: {
    bot: [
      "We don't publish a fixed price list — the honest answer depends on scope, so we quote against what you actually need rather than put a misleading number on a page.",
      'You get that scope and cost in writing before anything starts. No surprise line items, and ad spend (if any) stays in your own accounts.',
    ],
    options: [
      { label: 'See how we build software, step by step', href: '/development#process' },
      { label: 'See how we run marketing, step by step', href: '/media#process' },
      { label: 'Talk to us about a real quote', next: 'human' },
      { label: '← Back', next: 'start' },
    ],
  },

  human: {
    bot: ['Fastest ways to reach a real person:'],
    options: [
      {
        label: 'WhatsApp us',
        external: 'https://wa.me/919591522856?text=Hi%20Nexlifie!%20I%20have%20a%20question.',
      },
      { label: 'Send an enquiry', href: '/contact' },
      { label: '← Back', next: 'start' },
    ],
  },
};

export const CHATBOT_START_NODE = 'start';

export default chatbotFlow;
