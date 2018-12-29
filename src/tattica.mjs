const tattica = (props) => {
  const log = console.log;
  const config = props || {};
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const string = config.string || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const store = {};

  log(flags);
  flags.forEach((flag, i) => {
    const single = {};
    const src = flag.src;
    // single.src = original_src;
    const element = flag;
    const key = i;

    store[key] = {
      src,
      element,
      key,
    };

    flag.setAttribute('data-preload-key', i);
    flag.src = string;
    log(store);
  });
  window.requestIdleCallback(() => {
    log('changing');
    Object.keys(store).forEach(node => store[node].element.src = store[node].src);
    log('finished');
  });
};

tattica();