import PageLayout from '../components/PageLayout';
import { breadcrumbList, localBusiness, serviceSchema } from '../lib/seo';
import DevelopmentHero from '../components/development/DevelopmentHero';
import DevelopmentProblem from '../components/development/DevelopmentProblem';
import DevelopmentSolution from '../components/development/DevelopmentSolution';
import DevelopmentAI from '../components/development/DevelopmentAI';
import DevelopmentCustomSoftware from '../components/development/DevelopmentCustomSoftware';
import DevelopmentMobile from '../components/development/DevelopmentMobile';
import DevelopmentWebApps from '../components/development/DevelopmentWebApps';
import DevelopmentWebsites from '../components/development/DevelopmentWebsites';
import DevelopmentGames from '../components/development/DevelopmentGames';
import DevelopmentEcosystem from '../components/development/DevelopmentEcosystem';
import DevelopmentProcess from '../components/development/DevelopmentProcess';
import DevelopmentIndustries from '../components/development/DevelopmentIndustries';
import DevelopmentFeaturedWork from '../components/development/DevelopmentFeaturedWork';
import DevelopmentPositioning from '../components/development/DevelopmentPositioning';
import DevelopmentCTA from '../components/development/DevelopmentCTA';

/**
 * The page is ordered as a sales story, not a service catalogue:
 * problem → consolidation → each capability → ecosystem → process → proof → ask.
 */
const DevelopmentPage = () => (
  <PageLayout
    title="Custom Software, AI & App Development Company in Bangalore — Nexlifie"
    description="Nexlifie builds technology around your business: AI solutions, custom business software, mobile apps for Android and iOS, web applications, websites and game applications. Bengaluru-based engineering team working worldwide."
    canonical="/development"
    structuredData={[
      breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Development' }]),
      localBusiness(),
      serviceSchema({
        name: 'Custom Software & Application Development',
        serviceType: 'Software development',
        description:
          'AI solutions, custom business software, mobile applications for Android and iOS, web applications, websites and game applications, built by a Bengaluru-based engineering team for clients locally and worldwide.',
        path: '/development',
      }),
    ]}
  >
    {/* Can Nexlifie solve my technology needs? */}
    <DevelopmentHero />
    {/* Do they understand my business problem? */}
    <DevelopmentProblem />
    {/* Can they replace my disconnected systems? */}
    <DevelopmentSolution />
    {/* The six capabilities, in order. */}
    <DevelopmentAI />
    <DevelopmentCustomSoftware />
    <DevelopmentMobile />
    <DevelopmentWebApps />
    <DevelopmentWebsites />
    <DevelopmentGames />
    {/* Why one partner for all six. */}
    <DevelopmentEcosystem />
    {/* How will they work with me? */}
    <DevelopmentProcess />
    <DevelopmentIndustries />
    {/* Have they actually built things? */}
    <DevelopmentFeaturedWork />
    {/* How do I start? */}
    <DevelopmentPositioning />
    <DevelopmentCTA />
  </PageLayout>
);

export default DevelopmentPage;
