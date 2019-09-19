import _ from 'lodash';

const stringTypes = {
  object: (obj, indent) => {
    const oneSpace = ' ';
    const levelUppedIndent = `${indent}${oneSpace.repeat(4)}`;
    const pairsKeyAndValue = _.toPairs(obj);
    const toString = pairsKeyAndValue.map(([key, value]) => `${key}: ${value}`).join('\n');
    return `{\n${levelUppedIndent}${toString}\n${indent}}`;
  },
  string: value => value,
  number: value => `${value}`,
  boolean: value => value,
};

export default (value, indent) => stringTypes[typeof value](value, indent);
