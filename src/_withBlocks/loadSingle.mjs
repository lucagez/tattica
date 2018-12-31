
const loadSingle = (img, which) => {
  const ref = img;
  const attr = ref.attributes[which] || 'data-src';
  const src = ref.attributes[attr].value;
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
