import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPixel } from '../lib/pixel';

/**
 * React Router does not reset scroll position on navigation — a client-side
 * route change keeps whatever scroll offset the previous page was at, so
 * following a link from partway down a long page lands you partway down (or
 * at the bottom of) the new one instead of its top.
 *
 * This scrolls to the top of the page on every route change, or to the
 * matching element when the new URL carries a hash (e.g. a link to
 * `/media#stack-builder`), the same place a hard page load would land.
 * Rendered once, inside the Router, in App.jsx.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The Meta Pixel base snippet in index.html already fires the initial
    // PageView on hard load — only track subsequent client-side navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      trackPixel('PageView');
    }

    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
