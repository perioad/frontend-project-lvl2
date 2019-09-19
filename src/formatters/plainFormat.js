const toProperView = (value) => {
  const valueTypes = {
    boolean: value,
    string: `'${value}'`,
    number: value,
    object: '[complex value]',
  };

  return valueTypes[typeof value];
};

const keysTypes = [
  {
    check: type => type === 'nested',
    makeString: (children, name, path, func) => `${func(children, path)}`,
  },
  {
    check: type => type === 'key changed',
    makeString: (value, name, path) => `Property '${path.join('.')}' was updated. From ${toProperView(value.old)} to ${toProperView(value.new)}`,
  },
  {
    check: type => type === 'key deleted',
    makeString: (value, name, path) => `Property '${path.join('.')}' was removed`,
  },
  {
    check: type => type === 'key added',
    makeString: (value, name, path) => `Property '${path.join('.')}' was added with value: ${toProperView(value)}`,
  },
  {
    check: type => type === 'without changes',
    makeString: () => '',
  },
];

const getStringMaker = type => keysTypes.find(({ check }) => check(type));

const plainFormat = (data, path = '') => data.map((key) => {
  const {
    name,
    type,
    value,
  } = key;
  const currentPath = [...path, name];
  const { makeString } = getStringMaker(type);
  const string = makeString(value, name, currentPath, plainFormat);
  return string;
}).filter(string => string !== '').join('\n');

export default plainFormat;
