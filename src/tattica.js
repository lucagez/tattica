import makeArr from './lib/makeArr';
import makeQueue from './lib/makeQueue';
import loader from './lib/loader';
import loadIntersections from './lib/loadIntersections';
import placeholder from './lib/placeholder';
import connection from './lib/connection';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  // console.log(flags);
  const elements = makeArr(flags);
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

tattica();
