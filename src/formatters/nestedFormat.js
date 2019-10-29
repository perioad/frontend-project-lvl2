import _ from 'lodash';

const indent = '    ';

const stringify = (content, depthLevel) => {
  if (!_.isObject(content)) {
    return `${content}`;
  }
  const nextDepthLevel = depthLevel + 1;
  const pairsKeyAndValue = _.toPairs(content);
  const toString = pairsKeyAndValue.map(([key, value]) => `${key}: ${value}`).join('\n');
  return `{\n${indent.repeat(nextDepthLevel)}${toString}\n${indent.repeat(depthLevel)}}`;
};

const keysTypes = {

  nested: (valueAfter, valueBefore, name, depthLevel, func, children) => `${indent.repeat(depthLevel)}${name}: ${func(children, depthLevel)}`,

  same: (valueAfter, valueBefore, name, depthLevel) => `${indent.repeat(depthLevel)}${name}: ${stringify(valueAfter, depthLevel)}`,

  changed: (valueAfter, valueBefore, name, depthLevel) => (
    `${indent.repeat(depthLevel).slice(2)}+ ${name}: ${stringify(valueAfter, depthLevel)}\n${indent.repeat(depthLevel).slice(2)}- ${name}: ${stringify(valueBefore, depthLevel)}`
  ),

  deleted: (valueAfter, valueBefore, name, depthLevel) => `${indent.repeat(depthLevel).slice(2)}- ${name}: ${stringify(valueBefore, depthLevel)}`,

  added: (valueAfter, valueBefore, name, depthLevel) => `${indent.repeat(depthLevel).slice(2)}+ ${name}: ${stringify(valueAfter, depthLevel)}`,

};

const render = (ast, depthLevel = 0) => `{\n${ast.map((key) => {
  const {
    name,
    type,
    valueAfter,
    valueBefore,
    children,
  } = key;
  const nextDepthLevel = depthLevel + 1;
<<<<<<< HEAD
  const string = keysTypes[type](valueAfter, valueBefore, name, nextDepthLevel, render, children);
=======
  const string = keysTypes[type](valueAfter, valueBefore, name, nextDepthLevel, render, children );
>>>>>>> dff4d3df151b67bd52ef88eef429ad9364fd3247
  return string;
}).join('\n')}\n${indent.repeat(depthLevel)}}`;

export default render;
