import PageLayout from '../components/PageLayout';
import Clients from '../sections/Clients';

const ClientsPage = () => (
  <PageLayout
    title="Clients — Nexlifie"
    description="Brands and businesses we've partnered with — from startups to established names. Trusted by 3X, Aurelian, Bibo, Bumblebee, EyeLuxe, Kerala Soul, and Trainifie."
    bannerLabel="Network Partners"
    bannerTitle="Trusted By"
  >
    <Clients />
  </PageLayout>
);

export default ClientsPage;
