import loadSingle from './loadSingle.mjs';
import error from './error.mjs';

const loadBlock = (block, connection) => new Promise((resolve) => {
  const promises = [];
  for (const img of block) {
    promises.push(loadSingle(img, connection).catch(error));
  }
  Promise.all(promises).then(() => resolve());
});


export default loadBlock;
