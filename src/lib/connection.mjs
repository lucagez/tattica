/**
 * check `navigator.connection.effectivetype` to control on what type of connection the user is on
 * => return an object referencing the:
 *  @param {number} num - number corresponding to the connection type
 *  @param {string} string - the status corresponding to the number. eg: `slow`, `medium`,
 *  `default` (for faster than 3g connections)
 *  @param {string} ref - the corresponding string used to match the correct attribute on the html element
 */
const connection = () => {
  // Navigator.connection is a feature available only in Chrome
  // => returning `default` for every browser that don't support this draft feature.
  if (typeof navigator.connection === 'undefined') return { string: 'default', ref: 'data-src' };

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
