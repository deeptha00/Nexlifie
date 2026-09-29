import servicesData from '../data/servicesData';

/**
 * Free-text search for the chatbot's input box. Purely client-side keyword
 * matching against real site content — no AI, no network call, nothing
 * invented. Every result is one of: jump to a flow node (`next`), go to a
 * real page (`href`), or open an external link (`external`) — the same
 * option shape `handleOption` in ChatbotWidget already understands.
 */

/* Shortcuts into the bot's own guided flow, so typing "pricing" or "call"
   lands in the same place tapping the matching menu button would. */
const flowShortcuts = [
  {
    label: 'Build something',
    next: 'buildMenu',
    keywords: 'build website app mobile application software product develop create project',
  },
  {
    label: 'Grow or market a business',
    next: 'growMenu',
    keywords: 'marketing grow seo social branding video ads influencer promote growth',
  },
  {
    label: 'How pricing & process work',
    next: 'pricing',
    keywords: 'pricing price cost quote budget rate how much charge process',
  },
  {
    label: 'Talk to a person',
    next: 'human',
    keywords: 'contact talk call human support whatsapp phone email speak person team',
  },
];

/* Real pages that aren't individual services. */
const sitePages = [
  { label: 'See real work we’ve built', href: '/clients', keywords: 'work portfolio projects clients case studies examples built' },
  { label: 'About Nexlifie', href: '/about', keywords: 'about company team who we are story founders' },
  { label: 'Send an enquiry', href: '/contact', keywords: 'contact enquiry email reach message form' },
  { label: 'Explore Development', href: '/development', keywords: 'development technology capabilities build engineering' },
  { label: 'Explore Media', href: '/media', keywords: 'media marketing agency growth department' },
];

/* Every service page, generated from the same data the pages themselves render
   from — this index can never claim a service that doesn't actually exist. */
const serviceEntries = servicesData.map((s) => ({
  label: s.title,
  href: `/services/${s.slug}`,
  keywords: `${s.title} ${s.tagline} ${s.description} ${s.slug.replace(/-/g, ' ')}`,
}));

const searchIndex = [...flowShortcuts, ...sitePages, ...serviceEntries];

/* Filler words carry no signal and, worse, false-match as substrings inside
   unrelated words (e.g. "to" inside "auto", "it" inside "architecture") —
   plain .includes() scoring was surfacing irrelevant results because of this. */
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does', 'for', 'from',
  'has', 'how', 'if', 'in', 'into', 'is', 'it', 'its', 'me', 'my', 'of', 'on', 'or',
  'our', 'so', 'that', 'the', 'their', 'they', 'this', 'to', 'us', 'was', 'we', 'what',
  'when', 'where', 'who', 'why', 'will', 'with', 'you', 'your',
]);

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Scores each index entry by how many distinct query tokens appear — as a
 * whole word or the start of one, e.g. "brand" matches "branding" — in its
 * keyword text, and returns the top matches. A token that also appears in the
 * result's own label counts extra, so an exact-ish match on the thing itself
 * outranks an incidental mention buried in a description.
 */
export const searchChatbot = (query, limit = 5) => {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));

  if (!tokens.length) return [];

  const scored = searchIndex
    .map((item) => {
      const haystack = item.keywords.toLowerCase();
      const label = item.label.toLowerCase();
      const score = tokens.reduce((sum, t) => {
        const startsWithToken = new RegExp(`\\b${escapeRegExp(t)}`);
        if (!startsWithToken.test(haystack)) return sum;
        return sum + (startsWithToken.test(label) ? 2 : 1);
      }, 0);
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.item);
};

export default searchChatbot;
