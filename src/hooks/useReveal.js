import { useEffect } from 'react';

// Fades section headers and `.reveal` elements up as they scroll into view (once each).
// Content is only hidden after this runs (via html.js-reveal), so if the observer is missing
// or the viewer prefers reduced motion, everything simply stays visible.
export default function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    root.classList.add('js-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.section-header, .reveal').forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
}
