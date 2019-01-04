const placeholder = (elements, string = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') => {
  elements.forEach((node) => {
    const element = node.el;
    if (!element.src || element.src === '') element.src = string;
  });
};

export default placeholder;
