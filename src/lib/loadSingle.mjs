const loadSingle = (node, connection) => {
  const {
    el,
    src,
    timestamp,
    timeout,
    callback,
  } = node;
  console.log(timeout);
  const asset = src[connection.string] || src.medium || src.slow || src.default;
  const isLoaded = el.attributes['data-is-loaded'];
  return new Promise((resolve, reject) => {
    if (isLoaded) resolve();
    if (timeout) setTimeout(resolve, timeout);
    el.onload = () => {
      el.style.visibility = 'visible';
      el.setAttribute('data-is-loaded', true);
      if (timestamp) el.setAttribute('data-timestamp-loaded', Date.now());
      if (callback) callback(el);
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
      if (timestamp) el.setAttribute('data-timestamp-loaded', Date.now());
      el.src = fallback;
      reject(error);
    };
    if (timestamp) el.setAttribute('data-timestamp-start', Date.now());
    el.src = asset;
  });
};

export default loadSingle;
