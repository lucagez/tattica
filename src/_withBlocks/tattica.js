import makeQueue from './makeQueue';
import loader from './loader';
import loadIntersections from './loadIntersections';
import placeholder from './placeholder';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const connection = navigator.connection.effectiveType.split('g')[0];
  const connectionValue = Number(connection.match(/\d/)[0]);

  console.log(connectionValue);
  placeholder(flags, config.string);
  window.addEventListener('load', () => {
    console.log('loaded initial');
    if (config.loadIntersections === true || !config.loadIntersections) loadIntersections(flags);
    window.requestIdleCallback(async () => {
      console.log('arrived idle state');
      const queue = makeQueue(flags);
      await loader(queue.withPriority);
      console.log('loaded high priority');
      await loader(queue.withBlockPriority);
      console.log('with block priority');
      await loader(queue.others);
      console.log('loaded everything');
    }, { timeout: 2000 });
  });
};

tattica();
