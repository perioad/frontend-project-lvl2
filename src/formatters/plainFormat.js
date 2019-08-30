import isComplexValue from '../utils/isComplexValue';
import isString from '../utils/isString';

const plainFormat = (data, path = '') => {
  const withBlankLines = data.map((key) => {
    const {
      name,
      type,
      value,
      valuePrevious,
      children,
    } = key;
    const valueComplexChecked = isString(value) ? `'${value}'` : isComplexValue(value);
    const valuePreviousComplexChecked = isString(valuePrevious)
      ? `'${valuePrevious}'`
      : isComplexValue(valuePrevious);
    const currentPath = `${path}${name}`;
    const keysTypes = {
      'key changed': `Property '${currentPath}' was updated. From ${valuePreviousComplexChecked} to ${valueComplexChecked}`,
      'key added': `Property '${currentPath}' was added with value: ${valueComplexChecked}`,
      'key deleted': `Property '${currentPath}' was removed`,
    };
    if (children.length > 0) {
      const dirPath = `${currentPath}.`;
      return `${plainFormat(children, dirPath)}`;
    }
    return keysTypes[type];
  });
  const result = withBlankLines.filter(key => typeof key === 'string').join('\n');
  return result;
};

export default plainFormat;
