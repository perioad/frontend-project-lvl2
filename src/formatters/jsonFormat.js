import _ from 'lodash';

const valueTypes = {
  object: (obj) => {
    const pairsKeyAndValue = _.toPairs(obj);
    const toString = pairsKeyAndValue.map(([key, value]) => `"${key}":"${value}"`).join(',');
    return `{${toString}}`;
  },
  string: value => `"${value}"`,
  number: value => `"${value}"`,
  boolean: value => value,
};

const toProperView = value => valueTypes[typeof value](value);

const keysTypes = {

  nested: (children, name, type, func, valuePrevious) => (
    `{"name": "${name}", "type": "${type}", "value": ${func(children)}, "valuePrevious": ${toProperView(valuePrevious)}}`
  ),

  same: (value, name, type, func, valuePrevious) => `{"name": "${name}", "type": "${type}", "value": ${toProperView(value)}, "valuePrevious": ${toProperView(valuePrevious)}}`,

  changed: (value, name, type, func, valuePrevious) => `{"name": "${name}", "type": "${type}", "value": ${toProperView(value)}, "valuePrevious": ${toProperView(valuePrevious)}}`,

  deleted: (value, name, type, func, valuePrevious) => `{"name": "${name}", "type": "${type}", "value": ${toProperView(value)}, "valuePrevious": ${toProperView(valuePrevious)}}`,

  added: (value, name, type, func, valuePrevious) => `{"name": "${name}", "type": "${type}", "values": ${toProperView(value)}, "valuePrevious": ${toProperView(valuePrevious)}}`,

};


const jsonFormat = ast => `[${ast.map((key) => {
  const {
    name,
    type,
    value,
    valuePrevious,
  } = key;
  const string = keysTypes[type](value, name, type, jsonFormat, valuePrevious);
  return string;
}).join(',')}]`;

export default jsonFormat;
