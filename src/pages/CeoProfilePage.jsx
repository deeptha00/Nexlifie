import { useEffect } from 'react';
import PageHead from '../components/PageHead';
import { breadcrumbList } from '../lib/seo';
import { profile } from '../data/ceoProfileContent';
import '../components/ceoProfile/ceoProfile.css';
import GradientWaves from '../components/ceoProfile/GradientWaves';
import { usePrefersReducedMotion } from '../components/ceoProfile/useMediaQuery';
import Navbar from '../components/ceoProfile/Navbar';
import Hero from '../components/ceoProfile/Hero';
import ContactNudge from '../components/ceoProfile/ContactNudge';
import About from '../components/ceoProfile/About';
import Services from '../components/ceoProfile/Services';
import Experience from '../components/ceoProfile/Experience';
import Principles from '../components/ceoProfile/Principles';
import Contact from '../components/ceoProfile/Contact';
import Footer from '../components/ceoProfile/Footer';

// Loaded only while this page is mounted, not globally, so the rest of the
// site's font payload is untouched.
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap';

const useScopedGoogleFont = (href) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.ceoProfileFont = 'true';
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
  url: 'https://nexlifie.com/ceo-profile',
  sameAs: [profile.linkedin, profile.instagram],
  address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
});

/**
 * Standalone founder profile — ported from the separately-deployed portfolio
 * (devopycham.github.io/portfolio) so it lives at nexlifie.com/ceo-profile
 * too. Intentionally self-contained (its own nav/footer/dark editorial
 * theme, scoped under the `ceo-profile` class in ceoProfile.css) rather than
 * wrapped in the main site's PageLayout — it's one person's bio page, not
 * another marketing page in the Nexlifie funnel.
 */
const CeoProfilePage = () => {
  const reducedMotion = usePrefersReducedMotion();
  useScopedGoogleFont(FONT_HREF);

  return (
    <div className="ceo-profile relative min-h-screen">
      <PageHead
        title="Muhammad Mubashir T | Founder & CEO, Nexlifie"
        description="Muhammad Mubashir T — Founder & CEO of Nexlifie. AI, Cybersecurity, Digital Transformation & marketing (Nexlifie Media) for startups, clinics, salons and service brands."
        canonical="/ceo-profile"
        structuredData={[
          breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Founder & CEO' }]),
          personSchema(),
        ]}
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <GradientWaves
          horizonColor="#062a1c"
          waveColor="#0b6b45"
          crestColor="#1a8a5c"
          speed={reducedMotion ? 0 : 0.3}
          amplitude={2.5}
          fogDepth={70}
          detail="low"
          opacity={0.4}
          mouseInteraction={false}
          grainIntensity={0.04}
        />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Principles />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ContactNudge />
    </div>
  );
};

export default CeoProfilePage;
