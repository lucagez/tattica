/**
 * Passing a placeholder at every elements that has empty src => no broken images
 * @param {Array} elements - elements array
 * @param {string} string - placeholder
 */

const placeholder = (elements, string = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') => {
  elements.forEach((node) => {
    const { el } = node;
    if (!el.src || el.src === '') {
      el.style.visibility = 'hidden';
      el.src = string;
    }
  });
};

export default placeholder;
