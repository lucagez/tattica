const print = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      
      resolve('waited');
    }, 2000);
  });
};

(async () => {
  const arr = [1, 2, 3];

  for (const i of arr) {
    await print(i);
  }
})();
