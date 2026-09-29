import { SITE_URL, business } from './siteConfig';

export { SITE_URL };

/**
 * items: [{ name, path }] — path omitted on the last (current) item.
 */
export const breadcrumbList = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
  })),
});

const postalAddress = () => {
  const { streetAddress, locality, region, postalCode, country } = business.address;
  return {
    '@type': 'PostalAddress',
    ...(streetAddress ? { streetAddress } : {}),
    addressLocality: locality,
    addressRegion: region,
    ...(postalCode ? { postalCode } : {}),
    addressCountry: country,
  };
};

const areaServed = () => {
  const areas = business.areaServed.map((area) => ({ '@type': area.type, name: area.name }));
  /* "Worldwide" alongside the Bengaluru entries: local presence, global reach. */
  if (business.servesWorldwide) areas.push({ '@type': 'Place', name: 'Worldwide' });
  return areas;
};

const openingHoursSpecification = () =>
  business.openingHours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  }));

/**
 * LocalBusiness — the single most important piece of markup for ranking in
 * Bengaluru. It tells Google where we physically are (address), that we serve
 * the city (areaServed), and that we also take work from anywhere (Worldwide).
 *
 * Emitted on the pages with local intent: home, contact, media, development.
 * The details themselves live in siteConfig.js and must match the Google
 * Business Profile exactly.
 */
export const localBusiness = ({ description } = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: business.name,
  legalName: business.legalName,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/og-image.png`,
  email: business.email,
  telephone: business.phoneE164,
  priceRange: '₹₹',
  description:
    description ||
    `${business.name} is a web development and digital marketing company based in Bengaluru, India, building websites, applications, AI solutions, branding and marketing systems for clients locally and worldwide.`,
  address: postalAddress(),
  ...(business.geo
    ? { geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude } }
    : {}),
  areaServed: areaServed(),
  openingHoursSpecification: openingHoursSpecification(),
  ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: business.phoneE164,
    email: business.email,
    contactType: 'sales',
    areaServed: business.servesWorldwide ? 'Worldwide' : business.address.country,
    availableLanguage: ['English', 'Hindi', 'Kannada', 'Malayalam'],
  },
});

/**
 * Service — for a specific offering, tied back to the Bengaluru business and
 * its service area, so "<service> in Bangalore" queries have something to match.
 */
export const serviceSchema = ({ name, description, serviceType, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  ...(serviceType ? { serviceType } : {}),
  description,
  ...(path ? { url: `${SITE_URL}${path}` } : {}),
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    address: postalAddress(),
  },
  areaServed: areaServed(),
});

/**
 * FAQPage — makes the questions eligible to appear as expandable answers
 * directly in the search result, which takes up more space in the SERP.
 * Only use it where the questions are genuinely visible on the page.
 */
export const faqPage = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});
