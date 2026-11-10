/**
 * Thin wrapper around the Meta Pixel global (loaded in index.html).
 * Safe to call before the pixel script has loaded or if it's blocked.
 */
export const trackPixel = (event, params) => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params);
};
