const makeQueue = (elements) => {
  const withPriority = elements
    .filter(e => e.order.dataPriority || e.order.dataPriorityBlock)
    .sort((a, b) => a.priority - b.priority);
  const others = elements
    .filter(e => !e.priority);
  return {
    withPriority,
    others,
  };
};

export default makeQueue;
