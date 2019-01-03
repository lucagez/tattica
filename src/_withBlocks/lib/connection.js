const connection = () => {
  const type = navigator.connection.effectiveType.split('g')[0];
  const typeNum = Number(type.match(/\d/)[0]);
  let typeString;
  if (typeNum < 3) {
    typeString = 'data-slow';
  } else if (typeNum < 4) {
    typeString = 'data-medium';
  } else {
    typeString = 'data-src';
  }
  return {
    num: typeNum,
    string: typeString,
  };
};

export default connection;
