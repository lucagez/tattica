import loadSingle from './loadSingle';

const loadBlock = (elements, blockNum, connection) => {
  const block = Object.keys(elements)
    .filter((e) => {
      const attr = elements[e].attributes['data-block'] || elements[e].attributes['data-priority-block'] || {};
      const { value } = attr;
      return value === blockNum;
    })
    .filter(e => !elements[e].attributes['data-is-loaded'])
    .map(e => elements[e]);

  return new Promise((resolve) => {
    const promises = [];
    for (const img of block) {
      promises.push(loadSingle(img, connection));
    }
    Promise.all(promises).then(() => resolve());
  });
};

export default loadBlock;
