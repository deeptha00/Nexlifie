import PageHead from '../components/PageHead';
import { breadcrumbList, localBusiness, serviceSchema, faqPage } from '../lib/seo';
import { faqs } from '../data/mediaOffer';
import WhatsAppButton from '../components/WhatsAppButton';
import ChatbotWidget from '../components/chatbot/ChatbotWidget';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MediaHero from '../components/media/MediaHero';
import MediaTrustStrip from '../components/media/MediaTrustStrip';
import MediaPainPoints from '../components/media/MediaPainPoints';
import MediaWhatWeDo from '../components/media/MediaWhatWeDo';
import MediaShowcase from '../components/media/MediaShowcase';
import MediaStackBuilder from '../components/media/MediaStackBuilder';
import MediaPackages from '../components/media/MediaPackages';
import MediaProof from '../components/media/MediaProof';
import MediaComparison from '../components/media/MediaComparison';
import MediaProcess from '../components/media/MediaProcess';
import MediaFAQ from '../components/media/MediaFAQ';
import MediaWhyNexlifie from '../components/media/MediaWhyNexlifie';
import MediaCTA from '../components/media/MediaCTA';

const MediaPage = () => (
  <div className="bg-[var(--bg-dark)] text-[var(--secondary)] min-h-screen selection:bg-green-500/30 selection:text-green-800">
    <PageHead
      title="Digital Marketing Agency in Bangalore — Nexlifie Media"
      description="Digital marketing, branding, SEO, video and social media management from a Bengaluru-based team. Nexlifie Media runs campaigns for businesses in Bangalore and worldwide."
      canonical="/media"
      structuredData={[
        breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Media' }]),
        localBusiness({
          description:
            'Nexlifie Media is a digital marketing agency in Bengaluru offering digital marketing, branding, SEO, AI videos, video production, influencer marketing and social media management to clients locally and worldwide.',
        }),
        serviceSchema({
          name: 'Digital Marketing & Branding',
          serviceType: 'Digital marketing',
          description:
            'Digital marketing, company and personal branding, SEO, AI videos, video production, influencer marketing and social media management, run as one growth system.',
          path: '/media',
        }),
        faqPage(faqs),
      ]}
    />
    <Navbar />
    <main>
      {/* Funnel order: hook → trust → problem → solution → proof of craft → interactive offer builder → packages → proof → differentiation → process → objections → cross-sell → close */}
      <MediaHero />
      <MediaTrustStrip />
      <MediaPainPoints />
      <MediaWhatWeDo />
      <MediaShowcase />
      <MediaStackBuilder />
      <MediaPackages />
      <MediaProof />
      <MediaComparison />
      <MediaProcess />
      <MediaFAQ />
      <MediaWhyNexlifie />
      <MediaCTA />
    </main>
    <Footer />
    <WhatsAppButton />
    <ChatbotWidget />
  </div>
);

export default MediaPage;
