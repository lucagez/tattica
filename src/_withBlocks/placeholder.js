const placeholder = (elements, string = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') => {
  elements.forEach((e) => {
    if (!e.src) e.src = string;
  });
};

export default placeholder;
