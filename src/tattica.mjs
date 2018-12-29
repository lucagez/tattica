import waitIntersections from './waitIntersections.mjs';
import iterativeLoad from './iterativeLoad.mjs';

const tattica = (props) => {
  const config = props || {};
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const string = config.string || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const store = {};

  flags.forEach((e, i) => {
    // .substr(1) erase the first character of src => we'll keep the correct URL
    const src = e.attributes.src.value.substr(1);
    const element = e;
    const key = i;

    store[key] = {
      src,
      element,
      key,
    };

    // we are setting a key attribute to every flagged element
    // so we will be able to retrieve with ease its original src value from @store.
    e.setAttribute('data-preload-key', i);
    // creating new attribute and setting to false because we will need later to check if
    // an asset has already been loaded.
    e.setAttribute('data-is-loaded', false);
    e.src = string;
  });
  window.requestIdleCallback(() => {
    waitIntersections(store);
    iterativeLoad(store);
  });
};

tattica();
