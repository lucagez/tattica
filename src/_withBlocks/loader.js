import loadSingle from './loadSingle';
import loadBlock from './loadBlock';
import waitIdle from './waitIdle';

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
  if (!hasBlockPriority && !hasBlock) await loadSingle(elements[index]);
  await waitIdle();
  loader(elements, resolve, newIndex);
};

const loaderWithPromise = elements => new Promise(resolve => loader(elements, resolve));

export default loaderWithPromise;
