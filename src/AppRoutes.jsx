import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DevelopmentPage from './pages/DevelopmentPage';
import MediaPage from './pages/MediaPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ClientsPage from './pages/ClientsPage';
import ContactPage from './pages/ContactPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CapabilityPage from './pages/CapabilityPage';
import CeoProfilePage from './pages/CeoProfilePage';
import CtoProfilePage from './pages/CtoProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { capabilitySlugs } from './data/capabilities';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/development" element={<DevelopmentPage />} />
    <Route path="/media" element={<MediaPage />} />
    <Route path="/services" element={<Navigate to="/development" replace />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/testimonials" element={<TestimonialsPage />} />
    <Route path="/clients" element={<ClientsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/ceo-profile" element={<CeoProfilePage />} />
    <Route path="/cto-profile" element={<CtoProfilePage />} />

    {/* The six core capabilities get their own pages. Declared before the
        generic :slug route so they win; the remaining services still fall
        through to the shared ServiceDetailPage template. */}
    {capabilitySlugs.map((slug) => (
      <Route key={slug} path={`/services/${slug}`} element={<CapabilityPage slug={slug} />} />
    ))}
    <Route path="/services/:slug" element={<ServiceDetailPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
