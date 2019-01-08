// return the value of the attribute {string} if the attribute exists
// return null otherwise
const attribute = (a, string) => {
  if (a[string]) return a[string].value;
  return null;
};

// Making an array referencing both the dom element and all his attributes is useful
// because you otherwise have to read from the DOM every time you need to know some value.

/**
 * @param {Array} elements - Collection of DOM nodes flagged by target attribute. eg: `data-flag`
 * @param {Object} config - Configuration object for tattica. Better explaination in `Tattica.mjs`
 */
const makeArr = (elements, config) => {
  const arr = [];
  elements.forEach((e, i) => {
    const attr = e.attributes;
    arr.push({
      el: e,
      key: i,
      timestamp: config.timestamp,
      timeout: config.timeout !== undefined ? config.timeout : 1000,
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
