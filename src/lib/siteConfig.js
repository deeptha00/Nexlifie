/**
 * Single source of truth for Nexlifie's name, address, phone and service area
 * (NAP). Used to build the LocalBusiness / Organization structured data and
 * the visible address in the footer and contact section.
 *
 * ⚠️ These details must match your Google Business Profile EXACTLY — same
 * spelling, same phone format, same street address. Google cross-checks the
 * two, and a mismatch is one of the most common reasons a business does not
 * rank in its own city.
 *
 * TODO before this goes live:
 *   1. streetAddress + postalCode — fill in (or leave '' if you do not publish
 *      a street address; the schema omits empty fields rather than emitting
 *      blanks, but a full address ranks better locally).
 *   2. geo — add the exact lat/lng of your office, or leave null.
 *   3. sameAs — add your real Instagram / LinkedIn / Google Business URLs.
 *   4. openingHours — correct these to your actual working hours.
 */
export const SITE_URL = 'https://nexlifie.com';

export const business = {
  name: 'Nexlifie',
  legalName: 'Nexlifie',
  email: 'info@nexlifie.com',
  phone: '+91 95915 22856',
  phoneE164: '+919591522856',

  /* Where we are — this is what makes us findable locally. */
  address: {
    streetAddress: '', // TODO
    locality: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '', // TODO
    country: 'IN',
  },

  /* Human-readable one-liners used in visible copy. */
  addressLine: 'Bengaluru, Karnataka, India',
  positioning: 'Based in Bengaluru. Working worldwide.',

  geo: null, // TODO e.g. { latitude: 12.9716, longitude: 77.5946 }

  /**
   * areaServed tells Google we are physically in Bengaluru but take work from
   * anywhere — the local ranking signal and the global reach signal at once.
   */
  areaServed: [
    { type: 'City', name: 'Bengaluru' },
    { type: 'AdministrativeArea', name: 'Karnataka' },
    { type: 'Country', name: 'India' },
  ],
  servesWorldwide: true,

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '18:30' },
    { days: ['Saturday'], opens: '10:00', closes: '16:00' },
  ],

  sameAs: [
    // TODO: 'https://www.instagram.com/…',
    // TODO: 'https://www.linkedin.com/company/…',
    // TODO: your Google Business Profile / Maps share URL
  ],
};
