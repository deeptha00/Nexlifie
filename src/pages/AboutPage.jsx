import PageLayout from '../components/PageLayout';
import { breadcrumbList } from '../lib/seo';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import Beliefs from '../components/about/Beliefs';
import Directors from '../components/about/Directors';
import WhyNexlifie from '../components/about/WhyNexlifie';
import FinalCTA from '../components/about/FinalCTA';

const AboutPage = () => (
  <PageLayout
    title="About Nexlifie — Technology Company in Bangalore"
    description="Nexlifie is a technology company based in Bengaluru, India, building digital products, software, AI solutions and marketing systems for clients worldwide. Learn who we are and how we work."
    canonical="/about"
    structuredData={[breadcrumbList([{ name: 'Home', path: '/' }, { name: 'About' }])]}
  >
    <AboutHero />
    <OurStory />
    <Beliefs />
    <Directors />
    <WhyNexlifie />
    <FinalCTA />
  </PageLayout>
);

export default AboutPage;
