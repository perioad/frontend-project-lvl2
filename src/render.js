import stringify from './utils/stringify';

const keysTypes = [
  {
    check: type => type === 'nested',
    makeString: (children, name, indent, func) => `${indent}${name}: ${func(children, indent)}`,
  },
  {
    check: type => type === 'without changes',
    makeString: (value, name, indent) => `${indent}${name}: ${stringify(value, indent)}`,
  },
  {
    check: type => type === 'key changed',
    makeString: (value, name, indent) => `${indent.slice(2)}+ ${name}: ${stringify(value.new, indent)}\n${indent.slice(2)}- ${name}: ${stringify(value.old, indent)}`,
  },
  {
    check: type => type === 'key deleted',
    makeString: (value, name, indent) => `${indent.slice(2)}- ${name}: ${stringify(value, indent)}`,
  },
  {
    check: type => type === 'key added',
    makeString: (value, name, indent) => `${indent.slice(2)}+ ${name}: ${stringify(value, indent)}`,
  },
];

const getStringMaker = type => keysTypes.find(({ check }) => check(type));

const render = (ast, indent = '') => `{\n${ast.map((key) => {
  const {
    name,
    type,
    value,
  } = key;
  const oneSpace = ' ';
  const levelUppedIndent = `${indent}${oneSpace.repeat(4)}`;
  const { makeString } = getStringMaker(type);
  const string = makeString(value, name, levelUppedIndent, render);
  return string;
}).join('\n')}\n${indent}}`;

export default render;
