import stringify from '../utils/stringify';

const keysTypes = {

  nested: (children, name, indent, func) => `${indent}${name}: ${func(children, indent)}`,

  same: (value, name, indent) => `${indent}${name}: ${stringify(value, indent)}`,

  changed: (value, name, indent, func, valuePrevious) => (
    `${indent.slice(2)}+ ${name}: ${stringify(value, indent)}\n${indent.slice(2)}- ${name}: ${stringify(valuePrevious, indent)}`
  ),

  deleted: (value, name, indent) => `${indent.slice(2)}- ${name}: ${stringify(value, indent)}`,

  added: (value, name, indent) => `${indent.slice(2)}+ ${name}: ${stringify(value, indent)}`,

};

const render = (ast, indent = '') => `{\n${ast.map((key) => {
  const {
    name,
    type,
    value,
    valuePrevious,
  } = key;
  const oneSpace = ' ';
  const levelUppedIndent = `${indent}${oneSpace.repeat(4)}`;
  const string = keysTypes[type](value, name, levelUppedIndent, render, valuePrevious);
  return string;
}).join('\n')}\n${indent}}`;

export default render;
