/**
 * Commercial content shown on /media (the sales page).
 *
 * Everything here is read by a prospect as a promise. Nothing in this file
 * invents a service, a price, a contract term, a response time or a
 * performance number — the copy sticks to what Nexlifie already describes
 * elsewhere on the site.
 *
 * ▸ TO STRENGTHEN THIS PAGE, fill in the real terms where marked TODO below.
 *   Concrete answers on pricing, timelines and contracts are what actually
 *   convert on a page like this — but only you can supply the true ones.
 */

/* Short reassurance line under the hero CTA. Claims about how we work, not offers. */
export const highlights = [
  'Strategy before spend',
  'Every channel under one team',
  'Reporting you can act on',
];

/* What running the growth system with us actually involves. Shown in the hero card. */
export const systemIncludes = [
  'A growth plan mapped to your business and audience',
  'Brand, content and video produced in-house',
  'Campaigns run and managed, not just set up',
  'Reporting that shows what each channel returned',
];

/**
 * Retainer tiers. `price` is optional — leave it null and the card shows
 * "Priced to your scope" instead of a number. Set it to e.g. '₹35,000/mo'
 * once you have a real figure you are happy to publish.
 */
export const packages = [
  {
    name: 'Starter',
    tagline: 'Get found',
    price: null, // TODO: add real starting price, or leave null
    bestFor: 'Local and early-stage businesses with little or no digital presence.',
    includes: [
      'Growth plan for your first 90 days',
      'Brand basics tightened up',
      'On-page & local SEO for your core pages',
      'Social media managed and posted consistently',
      'Performance reporting',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    tagline: 'Get leads',
    price: null, // TODO
    bestFor: 'Businesses with traffic that is not turning into enquiries yet.',
    includes: [
      'Everything in Starter',
      'Digital marketing campaigns run end to end',
      'Ongoing SEO and content published on a schedule',
      'AI video and reels for social & ads',
      'Company or personal branding work',
      'Review calls with the team running your account',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    tagline: 'Get market share',
    price: null, // TODO
    bestFor: 'Established brands ready to grow spend without losing control of it.',
    includes: [
      'Everything in Growth',
      'Full-funnel strategy across every channel',
      'Full video production — brand films, ads, shoots',
      'Influencer and creator campaigns',
      'Personal branding for the founder or leadership',
      'Deeper reporting and strategy sessions',
    ],
    popular: false,
  },
];

/**
 * Objection handling. These are the questions prospects actually ask before
 * they enquire, so answering them well removes friction.
 *
 * ▸ TODO: the answers below deliberately avoid quoting terms we have not
 *   confirmed. Replace the placeholder phrasing with your real policy on
 *   pricing, contract length and notice period — specific answers convert
 *   far better than "let's discuss".
 */
export const faqs = [
  {
    q: 'What does it cost?',
    a: 'It depends on which channels you need and how much we produce each month, so we quote against your scope rather than putting a misleading number on a page. You get the scope in writing before anything starts, and ad spend stays in your own accounts.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Paid campaigns move fastest — we can read the numbers within weeks of launch. SEO, branding and content compound more slowly and are judged over months, not days. We will tell you which timeline applies to your goals before you commit to anything.',
  },
  {
    q: 'Who owns the accounts, content and creatives?',
    a: 'You do. Ad accounts, analytics, domains, social handles and the assets we produce stay in your name, so nothing needs rebuilding if we ever part ways.',
  },
  {
    q: 'We already have a freelancer or an in-house person.',
    a: 'That is common and often works well. We either take the channels they are not covering, or sit above the work as the strategy and reporting layer so everything points in one direction. If you do not need us yet, we will say so.',
  },
  {
    q: 'Can you fix the website too, not just the marketing?',
    a: 'Yes. Nexlifie Development is the same company, so a slow site, a broken checkout or a page that will not convert gets handled by us instead of being added to your to-do list.',
  },
  {
    q: 'Are you only working with businesses in Bangalore?',
    a: 'No. Our team is based in Bengaluru, which means clients here can meet us in person — but most of the work is remote by default, and we run campaigns for businesses across India and internationally.',
  },
];
