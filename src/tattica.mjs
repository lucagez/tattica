const wait = (nodes) => {
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
          window.requestIdleCallback(() => console.log('idle again'));
        }
      }
    });
  }, options);

  observables.forEach((node) => {
    observer.observe(node);
  });
};

const tattica = (props) => {
  const config = props || {};
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const string = config.string || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const store = {};

  flags.forEach((e, i) => {
    const src = e.attributes.src.value.substr(1);
    const element = e;
    const key = i;

    store[key] = {
      src,
      element,
      key,
    };

    e.setAttribute('data-preload-key', i);
    e.setAttribute('data-is-loaded', false);
    e.src = string;
    console.log(src);
  });
  window.requestIdleCallback(() => wait(store));
};

tattica();
