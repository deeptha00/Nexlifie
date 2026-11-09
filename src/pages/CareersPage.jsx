import PageLayout from '../components/PageLayout';
import { breadcrumbList } from '../lib/seo';
import CareersHero from '../components/careers/CareersHero';
import JobOpenings from '../components/careers/JobOpenings';

const CareersPage = () => (
  <PageLayout
    title="Careers at Nexlifie — Join Our Team"
    description="Explore open roles at Nexlifie. We're a Bengaluru-based technology company building AI-powered products, secure digital systems, and marketing for clients worldwide — see current openings and apply."
    canonical="/careers"
    structuredData={[breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Careers' }])]}
  >
    <CareersHero />
    <JobOpenings />
  </PageLayout>
);

export default CareersPage;
