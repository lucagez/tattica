import loadSingle from './loadSingle';
import error from './error';

/**
 * Load multiple images (block) simultaneously
 * @param {Array} block - Already filtered array containing images belonging to the same block
 * @param {Object} connection - refer to `connection.mjs` or `loadSingle.mjs`
 */

const loadBlock = (block, connection) => new Promise((resolve) => {
  const promises = [];

  // requesting every image at the same time
  for (const img of block) {
    promises.push(loadSingle(img, connection).catch(error));
  }

  // waiting for completion
  Promise.all(promises).then(() => resolve());
});


export default loadBlock;
