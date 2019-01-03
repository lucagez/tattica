const fromLowest = obj => obj
  .sort((a, b) => a.priority - b.priority)
  .map(e => e.el);

const makeQueue = (elements) => {
  const withPriority = [];
  const others = [];
  Object.keys(elements).forEach((e) => {
    const el = elements[e];
    const { attributes } = el;
    if (attributes['data-priority'] || attributes['data-priority-block']) {
      const attr = attributes['data-priority'] || attributes['data-priority-block'];
      withPriority.push({
        el,
        priority: attr.value,
      });
    } else others.push(el);
  });
  const withPrioritySorted = fromLowest(withPriority);
  return {
    withPriority: withPrioritySorted,
    others,
  };
};

export default makeQueue;
