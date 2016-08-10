
module.exports = function createUniqueIdentifiers(identifiers) {
  const dupeCount = {};

  return identifiers.map((identifier) => {
    if (typeof dupeCount[identifier] !== 'undefined') {
      dupeCount[identifier] += 1;
    } else {
      dupeCount[identifier] = 0;
    }

    return dupeCount[identifier] === 0
      ? `${identifier}`
      : `${identifier}_${dupeCount[identifier]}`;
  });
};
