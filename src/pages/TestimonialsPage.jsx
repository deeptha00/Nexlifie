import PageLayout from '../components/PageLayout';
import { breadcrumbList } from '../lib/seo';
import Testimonials from '../sections/Testimonials';

const TestimonialsPage = () => (
  <PageLayout
    title="Testimonials — Nexlifie"
    description="See what our clients say about working with Nexlifie — verified partners who have experienced our premium digital solutions firsthand."
    canonical="/testimonials"
    structuredData={[breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Testimonials' }])]}
  >
    <Testimonials headingLevel="h1" />
  </PageLayout>
);

export default TestimonialsPage;
