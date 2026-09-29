import PageLayout from '../components/PageLayout';
import { breadcrumbList, localBusiness } from '../lib/seo';
import Hero from '../sections/Hero';
import Verticals from '../sections/Verticals';
import About from '../sections/About';
import Services from '../sections/Services';
import Clients from '../sections/Clients';
import Testimonials from '../sections/Testimonials';
import WhyNexlifie from '../sections/WhyNexlifie';
import Contact from '../sections/Contact';

const HomePage = () => (
  <PageLayout
    title="Nexlifie — Web Development & Digital Marketing Company in Bangalore"
    description="Nexlifie is a Bangalore-based technology and growth partner building websites, applications, AI solutions and digital marketing systems — for businesses in Bengaluru and worldwide."
    canonical="/"
    structuredData={[breadcrumbList([{ name: 'Home' }]), localBusiness()]}
  >
    <Hero />
    <Verticals />
    <About />
    <Services />
    <Clients />
    <Testimonials />
    <WhyNexlifie />
    <Contact />
  </PageLayout>
);

export default HomePage;
