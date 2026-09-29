import PageLayout from '../components/PageLayout';
import { breadcrumbList, faqPage, localBusiness, serviceSchema } from '../lib/seo';
import capabilities, { capabilityBySlug } from '../data/capabilities';
import {
  CapabilityHero,
  CapabilityProblem,
  CapabilityBuild,
  CapabilityScenario,
  CapabilityProcess,
  CapabilityDeliverables,
  CapabilityWork,
  CapabilityFAQ,
  CapabilityNext,
  CapabilityCTA,
} from '../components/capability/sections';
import {
  CorporateSite,
  Dashboard,
  EcommerceSite,
  GameScreen,
  LobbyCard,
  PhonePair,
  PlatformUI,
  ProductSite,
  SystemHub,
  WorkflowTrace,
} from '../components/development/visuals';

/**
 * The signature visual each page leads with — the same component the
 * Development page used to make the promise, so the page delivers on it.
 */
const heroVisual = {
  'ai-solutions': <WorkflowTrace />,
  'custom-software': <PlatformUI />,
  'mobile-apps': <PhonePair />,
  'web-applications': <Dashboard />,
  'website-development': <CorporateSite />,
  'gaming-applications': <GameScreen />,
};

/** A second visual under "in practice", where the capability has one to show. */
const scenarioVisual = {
  'custom-software': <SystemHub />,
  'gaming-applications': <LobbyCard />,
  'website-development': (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
      <EcommerceSite />
      <ProductSite />
    </div>
  ),
};

/**
 * One page per core capability, at the /services/* routes the Development page
 * already links to. Content lives in data/capabilities.js.
 */
const CapabilityPage = ({ slug }) => {
  const capability = capabilityBySlug[slug];

  return (
    <PageLayout
      title={capability.seo.title}
      description={capability.seo.description}
      canonical={`/services/${capability.slug}`}
      structuredData={[
        breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Development', path: '/development' },
          { name: capability.name },
        ]),
        localBusiness(),
        serviceSchema({
          name: capability.name,
          serviceType: capability.seo.serviceType,
          description: capability.seo.description,
          path: `/services/${capability.slug}`,
        }),
        faqPage(capability.faqs),
      ]}
    >
      <CapabilityHero capability={capability} visual={heroVisual[capability.slug]} />
      <CapabilityProblem capability={capability} />
      <CapabilityBuild capability={capability} />
      <CapabilityScenario capability={capability} visual={scenarioVisual[capability.slug]} />
      <CapabilityProcess capability={capability} />
      <CapabilityDeliverables capability={capability} />
      {capability.work && <CapabilityWork capability={capability} />}
      <CapabilityFAQ capability={capability} />
      <CapabilityNext capability={capability} all={capabilities} />
      <CapabilityCTA capability={capability} />
    </PageLayout>
  );
};

export default CapabilityPage;
