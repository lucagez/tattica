const iterativeLoad = (nodes, i) => {
  let index = i || 0;
  if (!nodes[index]) {
    return;
  }

  const { element, src } = nodes[index];
  const isLoaded = element.attributes['data-is-loaded'].value === 'true';

  if (!isLoaded) {
    console.log('another load!');
    element.src = src;
    element.setAttribute('data-is-loaded', true);
  }
  window.requestIdleCallback(() => {
    iterativeLoad(nodes, index += 1);
  });
};

export default iterativeLoad;
