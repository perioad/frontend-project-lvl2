import _ from 'lodash';

const indent = '    ';

const stringTypes = {
  object: (obj, depthLevel) => {
    const nextDepthLevel = depthLevel + 1;
    const pairsKeyAndValue = _.toPairs(obj);
    const toString = pairsKeyAndValue.map(([key, value]) => `${key}: ${value}`).join('\n');
    return `{\n${indent.repeat(nextDepthLevel)}${toString}\n${indent.repeat(depthLevel)}}`;
  },
  string: value => value,
  number: value => `${value}`,
  boolean: value => value,
};

const stringify = (value, depthLevel) => stringTypes[typeof value](value, depthLevel);

const keysTypes = {

  nested: (children, name, depthLevel, func) => `${indent.repeat(depthLevel)}${name}: ${func(children, depthLevel)}`,

  same: (valueAfter, name, depthLevel) => `${indent.repeat(depthLevel)}${name}: ${stringify(valueAfter, depthLevel)}`,

  changed: (valueAfter, name, depthLevel, func, valueBefore) => (
    `${indent.repeat(depthLevel).slice(2)}+ ${name}: ${stringify(valueAfter, depthLevel)}\n${indent.repeat(depthLevel).slice(2)}- ${name}: ${stringify(valueBefore, depthLevel)}`
  ),

  deleted: (valueAfter, name, depthLevel, func, valueBefore) => `${indent.repeat(depthLevel).slice(2)}- ${name}: ${stringify(valueBefore, depthLevel)}`,

  added: (valueAfter, name, depthLevel) => `${indent.repeat(depthLevel).slice(2)}+ ${name}: ${stringify(valueAfter, depthLevel)}`,

};

const render = (ast, depthLevel = 0) => `{\n${ast.map((key) => {
  const {
    name,
    type,
    valueAfter,
    valueBefore,
  } = key;
  const nextDepthLevel = depthLevel + 1;
  const string = keysTypes[type](valueAfter, name, nextDepthLevel, render, valueBefore);
  return string;
}).join('\n')}\n${indent.repeat(depthLevel)}}`;

export default render;
