import isComplexValue from '../utils/isComplexValue';
import isBoolean from '../utils/isBoolean';

const plainFormat = (data, path = '') => {
  const withBlankLines = data.map((key) => {
    const {
      name,
      type,
      value,
      valuePrevious,
      children,
    } = key;
    const curPath = name === 'root' ? path : `${path}${name}`;
    const valueComplexChecked = isBoolean(value) ? value : isComplexValue(value);
    const valuePreviousComplexChecked = isBoolean(valuePrevious)
      ? valuePrevious
      : isComplexValue(valuePrevious);
    const keysTypes = {
      'key changed': `Property '${curPath}' was updated. From ${valuePreviousComplexChecked} to ${valueComplexChecked}`,
      'key added': `Property '${curPath}' was added with value: ${valueComplexChecked}`,
      'key deleted': `Property '${curPath}' was removed`,
    };
    if (children.length > 0) {
      const dirPath = `${curPath}.`;
      return `${plainFormat(children, dirPath)}`;
    }
    return keysTypes[type];
  });
  const result = withBlankLines.filter(key => typeof key === 'string').join('\n');
  return result;
};

export default plainFormat;
