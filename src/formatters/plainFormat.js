const toProperView = (value) => {
  const valueTypes = {
    boolean: value,
    string: `'${value}'`,
    number: value,
    object: '[complex value]',
  };

  return valueTypes[typeof value];
};

const keysTypes = {

  nested: (children, name, path, func) => `${func(children, path)}`,

  changed: (value, name, path, func, valuePrevious) => (
    `Property '${path.join('.')}' was updated. From ${toProperView(valuePrevious)} to ${toProperView(value)}`
  ),

  deleted: (value, name, path) => `Property '${path.join('.')}' was removed`,

  added: (value, name, path) => `Property '${path.join('.')}' was added with value: ${toProperView(value)}`,

  same: () => '',

};


const plainFormat = (data, path = '') => data.map((key) => {
  const {
    name,
    type,
    value,
    valuePrevious,
  } = key;
  const currentPath = [...path, name];
  const string = keysTypes[type](value, name, currentPath, plainFormat, valuePrevious);
  return string;
}).filter(string => string !== '').join('\n');

export default plainFormat;
