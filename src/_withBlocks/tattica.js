import makeQueue from './lib/makeQueue';
import loader from './lib/loader';
import loadIntersections from './lib/loadIntersections';
import placeholder from './lib/placeholder';
import connection from './lib/connection';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const connectionType = connection();
  placeholder(flags, config.string);
  window.addEventListener('load', () => {
    // console.log('loaded initial');
    if (config.loadIntersections === true || !config.loadIntersections) loadIntersections(flags);
    window.requestIdleCallback(async () => {
      // console.log('arrived idle state');
      const queue = makeQueue(flags);
      console.log(queue);
      await loader(queue.withPriority);
      // console.log('loaded high priority');
      await loader(queue.withBlockPriority);
      // console.log('with block priority');
      await loader(queue.others);
      // console.log('loaded everything');
    }, { timeout: 2000 });
  });
};

tattica();
