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
