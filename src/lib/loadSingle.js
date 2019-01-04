const loadSingle = (node, connection) => {
  const {
    el,
    src,
    timestamp,
  } = node;
  const asset = src[connection.string] || src.default;
  const isLoaded = el.attributes['data-is-loaded'];
  return new Promise((resolve, reject) => {
    if (isLoaded) resolve();
    el.onload = () => {
      if (timestamp) el.setAttribute('data-timestamp', Date.now());
      el.setAttribute('data-is-loaded', true);
      resolve();
    };
    el.onerror = (err) => {
      const fallback = src.fall || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      const error = {
        err,
        ref: connection.ref,
        fall: src.fall,
        fallUsed: fallback,
        key: node.key,
      };
      if (timestamp) el.setAttribute('data-timestamp', Date.now());
      el.src = fallback;
      reject(error);
    };
    el.src = asset;
  });
};

export default loadSingle;
