import { useEffect } from 'react';
import { useHeadContext } from '../context/HeadContext';

const SITE_URL = 'https://nexlifie.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const setMetaTag = (attr, key, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href) => {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setJsonLd = (structuredData) => {
  document.querySelectorAll('script[data-page-jsonld]').forEach((el) => el.remove());
  (structuredData || []).forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-jsonld', 'true');
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
};

/**
 * PageHead — per-route metadata. Updates the live DOM on the client (so SPA
 * navigation after hydration keeps tags correct), and during the build-time
 * SSR pass writes the same data into HeadContext so scripts/prerender.mjs
 * can bake it into the static HTML for each route.
 */
const PageHead = ({ title, description, canonical, ogImage, ogType = 'website', structuredData }) => {
  const headCtx = useHeadContext();
  const resolvedCanonical = canonical ? `${SITE_URL}${canonical}` : undefined;
  const resolvedOgImage = !ogImage
    ? DEFAULT_OG_IMAGE
    : ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}${ogImage}`;

  if (headCtx) {
    headCtx.title = title;
    headCtx.description = description;
    headCtx.canonical = resolvedCanonical;
    headCtx.ogImage = resolvedOgImage;
    headCtx.ogType = ogType;
    headCtx.structuredData = structuredData || [];
  }

  useEffect(() => {
    document.title = title;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:site_name', 'Nexlifie');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', resolvedCanonical);
    setMetaTag('property', 'og:image', resolvedOgImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', resolvedOgImage);
    setCanonical(resolvedCanonical);
    setJsonLd(structuredData);
  }, [title, description, resolvedCanonical, resolvedOgImage, ogType, structuredData]);

  return null;
};

export default PageHead;
