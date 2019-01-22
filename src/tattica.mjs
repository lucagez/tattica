// Refer to single modules for functions explanations
import makeArr from './lib/makeArr';
import makeQueue from './lib/makeQueue';
import loader from './lib/loader';
import loadIntersections from './lib/loadIntersections';
import placeholder from './lib/placeholder';
import connection from './lib/connection';

/**
*@param {Object} config - Tells tattica how it should behave
*@param {string} config.flag - Attribute to search in the DOM to select elements for the loading queue
*@param {string} config.string - String to use to set non-empty src attribute to every image (no broken images)
*@param {boolean} config.loadIntersections - Defaults to TRUE. Detect elements that enter the
* viewport and load image if not already loaded
*@param {number} config.timeout - Sets maximum loading time (in ms) for an image to load sync. Defaults to 1000ms.
* Can be set to FALSE. However settin it to false is discouraged in a real-world scenario.
*@param {function} config.callback - Pass callback to be executed after an image loading resolve. Defaults to null
*@param {boolean} config.timestamp - If set to TRUE prints Date.now() in `timestamp` image attribute.
* Useful for testing purpose. eg: check if images are loading synchronously
*/

const tattica = (config = {}) => {
  const flag = config.flag || 'data-flag';
  const flags = document.querySelectorAll(`[${flag}]`);
  // array-like object containing all the attributes useful for every single element
  const elements = makeArr(flags, config);
  const connectionType = connection();

  // set non-empty src attribute
  placeholder(elements, config.string);

  // `load` event is dispatched only after every element and every asset requested initially from the page is laoded
  // By starting after the `load` event means that (hopefully) everything critical is loaded.
  // We can start our background work without saturating the connection.
  window.addEventListener('load', () => {
    // The intersectionObserver is fired anyway after the `load` event.
    // So we don't need to worry about images in viewport that don't load.
    // However, we are waiting for an `idleCallback` before starting to load the queue.
    if (config.loadIntersections) loadIntersections(flags);
    window.requestIdleCallback(async () => {
      // array of elements ordered in two queues (`withPriority`, `others`)
      const queue = makeQueue(elements);
      await loader(queue.withPriority, connectionType);
      await loader(queue.others, connectionType);
    }, {
      timeout: 2000,
    });
  });
};

export default tattica;
