import loadSingle from './loadSingle';
import loadBlock from './loadBlock';
import waitIdle from './waitIdle';
import error from './error';

/**
 * Recursively loading all elements.
 * If:
 * - element at current index is part of a block => the block is loaded
 * else:
 * - is loaded the single element
 *
 * The connection type is always passed
 *
 * @param {Array} elements - refer to `makeArr.mjs`
 * @param {Object} connection - refer to `connection.mjs`
 * @param {function} resolve - Promise resolve method attached
 * @param {number} index - Index used for recursively load every element. Starts at `0`
 */

const loader = async (elements, connection, resolve, index = 0) => {
  const newIndex = index + 1;
  const element = elements[index];

  // resolve if every element is loaded
  if (!element) {
    resolve();
    return;
  }
  const {
    dataBlock,
    dataPriorityBlock,
  } = element.order;
  const hasBlock = dataBlock || dataPriorityBlock;
  if (hasBlock) {
    // filter the elements belonging to the same block of the elements at current index
    const block = elements
      .filter(e => e.order.dataBlock === hasBlock || e.order.dataPriorityBlock === hasBlock);
    await loadBlock(block, connection);
  } else {
    await loadSingle(element, connection).catch(error);
  }

  // wait for idle before next request
  await waitIdle();
  loader(elements, connection, resolve, newIndex);
};

// Attach a promise to loader => It can be executed with `await` in an async block => cleaner syntax
const loaderWithPromise = (elements, connection) => new Promise(resolve => loader(elements, connection, resolve));

export default loaderWithPromise;
