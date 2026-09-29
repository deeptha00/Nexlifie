import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ChatbotWidget from './chatbot/ChatbotWidget';
import PageHead from './PageHead';

/**
 * PageLayout — wraps a section component with the shared chrome (Navbar, Footer, SEO, bg).
 */
const PageLayout = ({ title, description, canonical, ogImage, structuredData, noindex, children }) => (
  <div className="bg-[var(--bg-dark)] text-[var(--secondary)] min-h-screen selection:bg-green-500/30 selection:text-green-800">
    <PageHead
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      structuredData={structuredData}
      noindex={noindex}
    />
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
    <ChatbotWidget />
  </div>
);

export default PageLayout;
