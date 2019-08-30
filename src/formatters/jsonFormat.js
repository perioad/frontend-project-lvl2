const preFormat = (data) => {
  const result = data.map((key) => {
    const {
      name,
      type,
      value,
      valuePrevious,
      children,
    } = key;
    const valueObjectChecked = JSON.stringify(value);
    const valuePreviousObjectChecked = JSON.stringify(valuePrevious);
    const keysTypes = {
      'without changes': `"${name}": {"type": "${type}", "value": ${valueObjectChecked}}`,
      'key changed': `"${name}": {"type": "${type}", "value": ${valueObjectChecked}, "valuePrevious": ${valuePreviousObjectChecked}}`,
      'key added': `"${name}": {"type": "${type}", "value": ${valueObjectChecked}}`,
      'key deleted': `"${name}": {"type": "${type}", "value": ${valueObjectChecked}}`,
    };
    if (children.length > 0) {
      return `"${name}": {${preFormat(children)}}`;
    }
    return keysTypes[type];
  }).join(',');
  return result;
};

const jsonFormat = data => `{${preFormat(data)}}`;

export default jsonFormat;
