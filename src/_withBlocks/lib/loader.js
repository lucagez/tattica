import loadSingle from './loadSingle';
import loadBlock from './loadBlock';
import waitIdle from './waitIdle';

const loader = async (elements, connection, resolve, index = 0) => {
  const newIndex = index + 1;
  if (!elements[index]) {
    resolve();
    return;
  }
  const hasBlock = elements[index].attributes['data-block'];
  const hasBlockPriority = elements[index].attributes['data-priority-block'];
  console.log(hasBlockPriority);
  if (hasBlock) await loadBlock(elements, hasBlock.value, connection);
  if (hasBlockPriority) await loadBlock(elements, hasBlockPriority.value, connection);
  if (!hasBlockPriority && !hasBlock) await loadSingle(elements[index], connection);
  await waitIdle();
  loader(elements, connection, resolve, newIndex);
};

const loaderWithPromise = (elements, connection) => {
  return new Promise(resolve => loader(elements, connection, resolve));
};

export default loaderWithPromise;
