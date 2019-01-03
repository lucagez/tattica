const fromLowest = (obj) => {
  return obj
    .sort((a, b) => a.priority - b.priority)
    .map(e => e.el);
}

const makeQueue = (elements) => {
  const withPriority = [];
  const withBlockPriority = [];
  const others = [];
  Object.keys(elements).forEach((e) => {
    const el = elements[e];
    const { attributes } = el;
    if (attributes['data-priority']) {
      withPriority.push({
        el,
        priority: attributes['data-priority'].value,
      });
    } else if (attributes['data-block-priority']) {
      withBlockPriority.push({
        el,
        priority: attributes['data-block-priority'].value,
      });
    } else others.push(el);
  });
  const withPrioritySorted = fromLowest(withPriority);
  const withBlockPrioritySorted = fromLowest(withBlockPriority);
  return {
    withPriority: withPrioritySorted,
    withBlockPriority: withBlockPrioritySorted,
    others,
  };
};

export default makeQueue;
