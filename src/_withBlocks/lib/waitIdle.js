const waitIdle = () => new Promise((resolve) => {
  window.requestIdleCallback(() => {
    resolve();
  }, {
    timeout: 2000,
  });
});

export default waitIdle;
