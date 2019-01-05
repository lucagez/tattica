const attribute = (a, string) => {
  if (a[string]) return a[string].value;
  return null;
};

const makeArr = (elements, config) => {
  const arr = [];
  elements.forEach((e, i) => {
    const attr = e.attributes;
    arr.push({
      el: e,
      key: i,
      timestamp: config.timestamp,
      priority: Number(attribute(attr, 'data-priority') || attribute(attr, 'data-priority-block')) || null,
      order: {
        dataPriority: attribute(attr, 'data-priority'),
        dataPriorityBlock: attribute(attr, 'data-priority-block'),
        dataBlock: attribute(attr, 'data-block'),
      },
      src: {
        initial: attribute(attr, 'src'),
        default: attribute(attr, 'data-src'),
        medium: attribute(attr, 'data-src-medium'),
        slow: attribute(attr, 'data-src-slow'),
        fall: attribute(attr, 'data-src-fall'),
      },
      callback: config.callback || null,
    });
  });
  return arr;
};

export default makeArr;
