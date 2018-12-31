import loadSingle from './loadSingle.mjs';

const loadBlock = (elements, blockNum) => {
  const block = Object.keys(elements)
    .filter(e => !elements[e].attributes['data-is-loaded'])
    .map(e => elements[e]);

  return new Promise((resolve) => {
    const promises = [];
    for (const img of block) {
      promises.push(loadSingle(img));
    }
    Promise.all(promises).then(() => resolve());
  });
};

export default loadBlock;
