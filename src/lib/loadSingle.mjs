/**
 * Loads a single image
 * return a Promise that is:
 * - resolved after image load
 * - rejected if an error occurs. eg: wrong URL provided
 * note: timestamp is printed before and after `onload`
 * => when testing, is possible to know exactly when the images easier
 *
 * @param {Object} node - Object containing all the info needed to load the image
 * @param {Object} connection - Tells which URL to pass to the `src` attribute
 */

const loadSingle = (node, connection) => {
  // destructuring
  const {
    el,
    src,
    timestamp,
    timeout,
    callback,
  } = node;

  // falling back to non-null URLs
  const asset = src[connection.string] || src.medium || src.slow || src.default;

  // Check if the image is already loaded by `loadIntersections.js`
  const isLoaded = el.attributes['data-is-loaded'];
  return new Promise((resolve, reject) => {
    if (isLoaded) resolve();
    if (timeout) setTimeout(resolve, timeout);
    el.onload = () => {
      el.style.visibility = 'visible';
      el.setAttribute('data-is-loaded', true);
      if (timestamp) el.setAttribute('data-timestamp-loaded', Date.now());
      if (callback) callback(el);
      resolve();
    };
    el.onerror = (err) => {
      // if no fallback is provided a 1px gif weighting 3bytes is loaded => no broken images
      const fallback = src.fall || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      const error = {
        err,
        ref: connection.ref,
        fall: src.fall,
        fallUsed: fallback,
        key: node.key,
      };
      if (timestamp) el.setAttribute('data-timestamp-loaded', Date.now());
      el.src = fallback;

      // error is catched by `error.mjs`
      reject(error);
    };
    if (timestamp) el.setAttribute('data-timestamp-start', Date.now());
    el.src = asset;
  });
};

export default loadSingle;
