import NoiseOverlay from '../components/ui/NoiseOverlay';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import PageHead from '../components/PageHead';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import TechMatrix from '../sections/TechMatrix';
import Clients from '../sections/Clients';
import Testimonials from '../sections/Testimonials';
import WhyNexlifie from '../sections/WhyNexlifie';
import Contact from '../sections/Contact';

const HomePage = () => (
  <div className="bg-[#020202] text-white selection:bg-green-500/40 selection:text-green-400 min-h-screen relative overflow-hidden">
    <PageHead
      title="Nexlifie — Innovate, Build, Grow"
      description="Nexlifie builds modern websites, powerful applications, AI solutions, and automation systems for growing businesses worldwide."
    />
    <NoiseOverlay />
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20 digital-grid-system mask-fade-in" />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Services />
      <TechMatrix />
      <Clients />
      <Testimonials />
      <WhyNexlifie />
      <Contact />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default HomePage;
