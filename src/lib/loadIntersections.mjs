/**
 * Load elements that intersect the viewport if not already loaded
 * @param {Array} elements - elements flagged
 */

const waitIntersections = (elements) => {
  const observables = Object.keys(elements).map(e => elements[e]);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const isLoaded = entry.target.attributes['data-is-loaded'];
        if (!isLoaded) {
          const { target } = entry;
          target.style.visibility = 'visible';
          target.src = target.attributes['data-src'].value;

          // set attribute `data-is-loaded` so `loadSingle` avoid unnecessary request
          target.setAttribute('data-is-loaded', true);
        }
      }
    });
  }, options);

  observables.forEach((node) => {
    observer.observe(node);
  });
};

export default waitIntersections;
