import PageLayout from '../components/PageLayout';
import Services from '../sections/Services';

const ServicesPage = () => (
  <PageLayout
    title="Services — Nexlifie"
    description="Web development, mobile apps, AI solutions, cloud infrastructure, UI/UX design, e-commerce, digital marketing, and SEO — all under one roof at Nexlifie."
    bannerLabel="What We Offer"
    bannerTitle="Core Services"
  >
    <Services />
  </PageLayout>
);

export default ServicesPage;
