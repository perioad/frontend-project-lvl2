import _ from 'lodash';

const stringTypes = {
  object: (obj) => {
    const pairsKeyAndValue = _.toPairs(obj);
    const toString = pairsKeyAndValue.map(([key, value]) => `"${key}":"${value}"`).join(',');
    return `{${toString}}`;
  },
  string: value => `"${value}"`,
  number: value => `"${value}"`,
  boolean: value => value,
};

const stringify = value => stringTypes[typeof value](value);

const keysTypes = [
  {
    check: type => type === 'nested',
    makeString: (children, name, type, func) => `"${name}": ${func(children)}`,
  },
  {
    check: type => type === 'identic',
    makeString: (value, name, type) => `"${name}": {"type": "${type}", "value": ${stringify(value)}}`,
  },
  {
    check: type => type === 'changed',
    makeString: (value, name, type) => `"${name}": {"type": "${type}", "value": ${stringify(value.new)}, "valuePrevious": ${stringify(value.old)}}`,
  },
  {
    check: type => type === 'deleted',
    makeString: (value, name, type) => `"${name}": {"type": "${type}", "value": ${stringify(value)}}`,
  },
  {
    check: type => type === 'added',
    makeString: (value, name, type) => `"${name}": {"type": "${type}", "value": ${stringify(value)}}`,
  },
];

const getStringMaker = type => keysTypes.find(({ check }) => check(type));

const jsonFormat = ast => `{${ast.map((key) => {
  const {
    name,
    type,
    value,
  } = key;
  const { makeString } = getStringMaker(type);
  const string = makeString(value, name, type, jsonFormat);
  return string;
}).join(',')}}`;

export default jsonFormat;
