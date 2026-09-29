export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const fadeUpScale = (delay = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const staggerParent = (staggerDelay = 0.08, baseDelay = 0) => ({
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay, delayChildren: baseDelay } },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const lift = { y: -4, transition: { duration: 0.3, ease: EASE } };
