import makeArr from './lib/makeArr.mjs';
import makeQueue from './lib/makeQueue.mjs';
import loader from './lib/loader.mjs';
import loadIntersections from './lib/loadIntersections.mjs';
import placeholder from './lib/placeholder.mjs';
import connection from './lib/connection.mjs';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  // console.log(flags);
  const elements = makeArr(flags, config);
  const connectionType = connection();
  placeholder(elements, config.string);
  window.addEventListener('load', () => {
    if (config.loadIntersections === true || !config.loadIntersections) loadIntersections(flags);
    window.requestIdleCallback(async () => {
      const queue = makeQueue(elements);
      await loader(queue.withPriority, connectionType);
      await loader(queue.others, connectionType);
    }, { timeout: 2000 });
  });
};

export default tattica;
