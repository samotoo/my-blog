exports.onClientEntry = () => {
  // Register leancloud AV object to global
  window.AV = require('leancloud-storage');

  // Load the smooth scroll polyfill.
  const smoothscroll = require('smoothscroll-polyfill');
  smoothscroll.polyfill();
  // Add smooth scroll effect to all anchors.
  if (typeof window !== 'undefined') {
    // Make scroll behavior of internal links smooth.
    require('smooth-scroll')('a[href*="#"]');
  }
};
