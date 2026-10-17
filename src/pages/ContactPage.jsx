import PageLayout from '../components/PageLayout';
import { breadcrumbList, localBusiness } from '../lib/seo';
import Contact from '../sections/Contact';

const ContactPage = () => (
  <PageLayout
    title="Contact Nexlifie — Bangalore Web Development & Marketing Team"
    description="Talk to Nexlifie about your website, app or marketing. Based in Bengaluru, Karnataka and working with clients worldwide — call +91 95915 22856 or send an enquiry."
    canonical="/contact"
    structuredData={[breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Contact' }]), localBusiness()]}
  >
    <Contact headingLevel="h1" />
  </PageLayout>
);

export default ContactPage;
