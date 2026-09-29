import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * Used to gate heavier effects (decrypt text, magnetic CTA, 3D parallax)
 * behind fine-pointer / motion-safe environments.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // Corrects the SSR-safe `false` default from useState's initializer to
    // the real client value right after mount (this page is hydrated from
    // prerendered HTML, so the initial render must match the server first).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export const useIsFinePointer = () => useMediaQuery('(pointer: fine)');
