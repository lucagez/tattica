import makeQueue from './makeQueue.mjs';
import loader from './loader.mjs';

// import loadBlock from './loadBlock.mjs';


(() => {
  const flags = document.querySelectorAll('[data-flag]');
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
})();
