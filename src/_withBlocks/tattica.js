import makeQueue from './makeQueue';
import loader from './loader';

const tattica = (config = {}) => {
  const flags = document.querySelectorAll(config.flag || '[data-flag]');
  const string = config.string || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
  const connection = navigator.connection.effectiveType.split('g')[0];
  const connectionValue = Number(connection.match(/\d/)[0]);

  console.log(string, connectionValue);

  window.addEventListener('load', () => {
    console.log('loaded initial');
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
