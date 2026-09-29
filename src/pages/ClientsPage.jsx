import PageLayout from '../components/PageLayout';
import { breadcrumbList } from '../lib/seo';
import Clients from '../sections/Clients';
import Works from '../sections/Works';

const ClientsPage = () => (
  <PageLayout
    title="Clients & Work — Nexlifie"
    description="Brands and businesses we've partnered with — from startups to established names. Trusted by 3X, Aurelian, Bibo, Bumblebee, EyeLuxe, Kerala Soul, and Trainifie."
    canonical="/clients"
    structuredData={[breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Clients & Work' }])]}
  >
    <Clients headingLevel="h1" />
    <Works />
  </PageLayout>
);

export default ClientsPage;
