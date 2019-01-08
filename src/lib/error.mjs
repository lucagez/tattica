/**
 * @param {Object} err - error object sent by `loadSingle.js` if image loading fails
 * @param {string} ref - The attribute which the URL results null
 * @param {number} key - Key identifier, unique for every element
 * @param {string} fall - URL provided by the element attribute
 * @param {string} fallUsed - URL string effectively used. Defaults to a 1px gif weighting 2bytes
 */

const errormsg = (err) => {
  const { error } = console;
  error(`
    The '${err.ref}' attribute you inserted in element at key '${err.key}' is invalid. 
    The 'data-src-fall' provided is: ${err.fall}
    Fallback used: ${err.fallUsed}
  `);
  error(err.err.target);
};

export default errormsg;
