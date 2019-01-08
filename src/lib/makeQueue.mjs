/**
 * Filter elements by priority
 * return two queues:
 * - withPriority, containing `data-priority` and `data-priority-block`
 * - others, all the others in DOM order
 * @param {Array} elements - Array containing objects with elements properties
 */

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
