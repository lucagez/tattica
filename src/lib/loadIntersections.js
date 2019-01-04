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
          target.src = target.attributes['data-src'].value;
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
