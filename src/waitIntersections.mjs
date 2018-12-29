const waitIntersections = (nodes) => {
  const observables = Object.keys(nodes).map(e => nodes[e].element);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const isLoaded = entry.target.attributes['data-is-loaded'].value === 'true';
        if (!isLoaded) {
          const { target } = entry;
          const key = target.attributes['data-preload-key'].value;
          target.src = nodes[key].src;
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
