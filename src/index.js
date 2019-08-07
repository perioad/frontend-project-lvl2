import _ from 'lodash';

const path = require('path');
const fs = require('fs');

export default (fileBefore, fileAfter) => {
  const pathToFileBefore = path.resolve(fileBefore);
  const pathToFileAfter = path.resolve(fileAfter);
  const fileBeforeOpened = fs.readFileSync(pathToFileBefore);
  const fileAfterOpened = fs.readFileSync(pathToFileAfter);
  const fileBeforeOpenedObject = JSON.parse(fileBeforeOpened);
  const fileAfterOpenedObject = JSON.parse(fileAfterOpened);
  const fileBeforeKeysInFileAfter = Object.keys(fileBeforeOpenedObject).reduce((acc, key) => {
    if (_.has(fileAfterOpenedObject, key)) {
      if (fileBeforeOpenedObject[key] === fileAfterOpenedObject[key]) {
        return { ...acc, [`${key}`]: fileAfterOpenedObject[key] };
      }
      return { ...acc, [`+ ${key}`]: fileAfterOpenedObject[key], [`- ${key}`]: fileBeforeOpenedObject[key] };
    }
    return { ...acc, [`- ${key}`]: fileBeforeOpenedObject[key] };
  }, {});
  const definedDifferenceObj = Object.keys(fileAfterOpenedObject).reduce(
    (acc, key) => (_.has(fileBeforeKeysInFileAfter, key) ? acc : { ...acc, [`+ ${key}`]: fileAfterOpenedObject[key] }),
    fileBeforeKeysInFileAfter,
  );
  const comparison = Object.keys(definedDifferenceObj).reduce(
    (acc, key) => (key[0] === '+' || key[0] === '-'
      ? [...acc, `  ${key}: ${definedDifferenceObj[key]}`]
      : [...acc, `    ${key}: ${definedDifferenceObj[key]}`]),
    [],
  ).join('\n');
  const result = `{\n${comparison}\n}`;
  console.log(result);
  return result;
};
