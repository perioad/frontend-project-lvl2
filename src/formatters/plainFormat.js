const stringify = (valueAfter) => {
  const valueTypes = {
    boolean: valueAfter,
    string: `'${valueAfter}'`,
    number: valueAfter,
    object: '[complex value]',
  };

  return valueTypes[typeof valueAfter];
};

const keysTypes = {

  nested: (path, valueAfter, valueBefore, func, children) => `${func(children, path)}`,

  changed: (path, valueAfter, valueBefore) => (
    `Property '${path.join('.')}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`
  ),

  deleted: path => `Property '${path.join('.')}' was removed`,

  added: (path, valueAfter) => `Property '${path.join('.')}' was added with value: ${stringify(valueAfter)}`,

  same: () => null,

};


const plainFormat = (data, path = '') => data.map((key) => {
  const {
    name,
    type,
    valueAfter,
    valueBefore,
    children,
  } = key;
  const currentPath = [...path, name];
  const string = keysTypes[type](currentPath, valueAfter, valueBefore, plainFormat, children);
  return string;
}).filter(string => string !== null).join('\n');

export default plainFormat;
