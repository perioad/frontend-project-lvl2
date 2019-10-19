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

  nested: (children, name, path, func) => `${func(children, path)}`,

  changed: (valueAfter, name, path, func, valueBefore) => (
    `Property '${path.join('.')}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`
  ),

  deleted: (valueAfter, name, path) => `Property '${path.join('.')}' was removed`,

  added: (valueAfter, name, path) => `Property '${path.join('.')}' was added with value: ${stringify(valueAfter)}`,

  same: () => null,

};


const plainFormat = (data, path = '') => data.map((key) => {
  const {
    name,
    type,
    valueAfter,
    valueBefore,
  } = key;
  const currentPath = [...path, name];
  const string = keysTypes[type](valueAfter, name, currentPath, plainFormat, valueBefore);
  return string;
}).filter(string => string !== null).join('\n');

export default plainFormat;
