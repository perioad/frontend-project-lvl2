import _ from 'lodash';
import chooseFormat from './chooseFormat';

export default (fileBeforeName, fileAfterName) => {
  const fileBefore = chooseFormat(fileBeforeName);
  const fileAfter = chooseFormat(fileAfterName);
  const fileBeforeOpenedObject = fileBefore.parse();
  const fileAfterOpenedObject = fileAfter.parse();
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
