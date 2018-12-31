import loadSingle from './loadSingle.mjs';

const loadBlock = (elements, blockNum) => {
  const block = Object.keys(elements)
    .filter((e) => {
      const attr = elements[e].attributes['data-block'] || elements[e].attributes['data-block-priority'] || {};
      const { value } = attr;
      return value === blockNum;
    })
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
