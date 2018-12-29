import waitIntersections from './waitIntersections.mjs';
import iterativeLoad from './iterativeLoad.mjs';

// .substr(1) erase the first character of src => we'll keep the correct URL

// we are setting a key attribute to every flagged element
// so we will be able to retrieve with ease its original src value from { store }.

// creating new attribute and setting to false because we will need later to check if
// an asset has already been loaded.
const tattica = (props) => {
  const config = props || {};
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const string = config.string || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const connection = navigator.connection.effectiveType.split('g')[0];
  const connectionValue = Number(connection.match(/\d/)[0]);
  const store = {};

  flags.forEach((e, i) => {
    const src = e.attributes['data-src'].value.substr(1);
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
  });

  const navigationTimings = window.performance.getEntriesByType('navigation')[0];
  const paintTimings = window.performance.getEntriesByType('paint');
  console.log(navigationTimings.domContentLoadedEventStart);
  console.log(paintTimings[0].startTime);
  console.log(navigationTimings.loadEventStart);

  window.requestIdleCallback(() => {
    waitIntersections(store);
    if (connectionValue > 2 && !navigator.connection.saveData) {
      let timeoutExceeded = true;
      window.onload = () => {
        timeoutExceeded = false;
        iterativeLoad(store);
      };
      setTimeout(() => {
        if (timeoutExceeded) {
          iterativeLoad(store);
        }
      }, 3000);
    }
  });
};

tattica();