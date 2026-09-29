import { useEffect } from 'react';
import PageHead from '../components/PageHead';
import { breadcrumbList } from '../lib/seo';
import { profile } from '../data/ctoProfileContent';
import '../components/ctoProfile/ctoProfile.css';
import Nav from '../components/ctoProfile/Nav';
import Hero from '../components/ctoProfile/Hero';
import Profile from '../components/ctoProfile/Profile';
import Architecture from '../components/ctoProfile/Architecture';
import Nexlifie from '../components/ctoProfile/Nexlifie';
import Craft from '../components/ctoProfile/Craft';
import Domains from '../components/ctoProfile/Domains';
import Contact from '../components/ctoProfile/Contact';
import Footer from '../components/ctoProfile/Footer';

// Loaded only while this page is mounted, not globally, so the rest of the
// site's font payload is untouched.
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

const useScopedGoogleFont = (href) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.ctoProfileFont = 'true';
    document.head.appendChild(link);
    return () => link.remove();
  }, [href]);
};

const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  worksFor: { '@type': 'Organization', name: 'Nexlifie', url: 'https://nexlifie.com' },
  url: 'https://nexlifie.com/cto-profile',
  sameAs: [profile.linkedin, profile.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
});

/**
 * Standalone CTO profile — ported from the separately-deployed portfolio
 * (deeptha00.github.io/Portfolio) so it lives at nexlifie.com/cto-profile
 * too. Intentionally self-contained (its own nav/footer/dark engineering
 * theme, scoped under the `cto-profile` class in ctoProfile.css) rather than
 * wrapped in the main site's PageLayout — it's one person's bio page, not
 * another marketing page in the Nexlifie funnel. Mirrors the structure of
 * CeoProfilePage.jsx.
 */
const CtoProfilePage = () => {
  useScopedGoogleFont(FONT_HREF);

  return (
    <div className="cto-profile relative min-h-screen">
      <PageHead
        title="Deeptha A | CTO & Co-Founder, Nexlifie"
        description="Deeptha A is a Software Developer and CTO & Co-Founder at Nexlifie, building web, mobile, AI, gaming and cloud products."
        canonical="/cto-profile"
        structuredData={[
          breadcrumbList([{ name: 'Home', path: '/' }, { name: 'CTO & Co-Founder' }]),
          personSchema(),
        ]}
      />
      <Nav />
      <main>
        <Hero />
        <Profile />
        <Architecture />
        <Nexlifie />
        <Craft />
        <Domains />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default CtoProfilePage;
