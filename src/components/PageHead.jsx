import { useEffect } from 'react';

/**
 * PageHead — updates document.title and meta description per page.
 * No extra library needed; works with CSR React apps.
 */
const PageHead = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);

  return null;
};

export default PageHead;
