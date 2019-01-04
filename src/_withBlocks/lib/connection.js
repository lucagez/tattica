const connection = () => {
  const type = navigator.connection.effectiveType.split('g')[0];
  const typeNum = Number(type.match(/\d/)[0]);
  let typeString;
  let ref;
  if (typeNum < 3) {
    typeString = 'slow';
    ref = 'data-src-slow';
  } else if (typeNum < 4) {
    typeString = 'medium';
    ref = 'data-src-medium';
  } else {
    typeString = 'default';
    ref = 'data-src';
  }
  return {
    num: typeNum,
    string: typeString,
    ref,
  };
};

export default connection;
