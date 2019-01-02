import loadSingle from './loadSingle';
import loadBlock from './loadBlock';

const loader = async (elements, resolve, index = 0) => {
  const newIndex = index + 1;
  if (!elements[index]) {
    resolve();
    return;
  }
  const hasBlock = elements[index].attributes['data-block'];
  const hasBlockPriority = elements[index].attributes['data-block-priority'];
  if (hasBlock) await loadBlock(elements, hasBlock.value);
  if (hasBlockPriority) await loadBlock(elements, hasBlockPriority.value);
  loadSingle(elements[index])
    .then(() => {
      window.requestIdleCallback(() => {
        console.log('loading another');
        loader(elements, resolve, newIndex);
      }, { timeout: 1000 });
    });
};

const loaderWithPromise = (elements) => {
  return new Promise((resolve) => {
    loader(elements, resolve);
  });
};

export default loaderWithPromise;
