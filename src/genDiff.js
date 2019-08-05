import _ from 'lodash';

const path = require('path');
const fs = require('fs');

export default (before, after) => {
  const pathToBeforeFile = path.resolve(before);
  const pathToAfterFile = path.resolve(after);
  const readBefore = fs.readFileSync(pathToBeforeFile);
  const readAfter = fs.readFileSync(pathToAfterFile);
  const readBeforeObj = JSON.parse(readBefore);
  const readAfterObj = JSON.parse(readAfter);
  const beforeKeysInAfter = Object.keys(readBeforeObj).reduce((acc, key) => {
    if (_.has(readAfterObj, key)) {
      if (readBeforeObj[key] === readAfterObj[key]) {
        return { ...acc, [key]: readAfterObj[key] };
      }
      return { ...acc, [`+ ${key}`]: readAfterObj[key], [`- ${key}`]: readBeforeObj[key] };
    }
    return { ...acc, [`- ${key}`]: readBeforeObj[key] };
  }, {});
  const definedDifferenceObj = Object.keys(readAfterObj).reduce(
    (acc, key) => (_.has(beforeKeysInAfter, key) ? acc : { ...acc, [`+ ${key}`]: readAfterObj[key] }),
    beforeKeysInAfter,
  );
  const definedDifference = JSON.stringify(definedDifferenceObj);
  return definedDifference;
};
