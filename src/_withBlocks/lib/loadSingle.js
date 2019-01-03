
const loadSingle = (img, connection) => {
  const ref = img;
  const attr = ref.attributes[connection.string || 'data-src'];
  const src = attr.value;
  const isLoaded = img.attributes['data-is-loaded'];
  return new Promise((resolve, reject) => {
    if (isLoaded) resolve();
    ref.onload = () => {
      ref.setAttribute('data-is-loaded', true);
      resolve();
    };
    ref.onerror = () => {
      const fallBack = ref.attributes['data-fall'].value;
      ref.src = fallBack;
      reject();
    };
    ref.src = src;
  });
};

export default loadSingle;
