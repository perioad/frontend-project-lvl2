export default (value, indent) => {
  const string = JSON.stringify(value);
  const lastIndex = string.length - 1;
  if (typeof value === 'string') {
    return string.slice(1, lastIndex);
  }
  if (value instanceof Object) {
    const iter = (iterString) => {
      if (iterString.length === 0) {
        return '';
      }
      const firstIndex = 0;
      const currentChar = iterString[firstIndex];
      if (currentChar === '{' || currentChar === '}' || currentChar === '"') {
        return `${iter(iterString.slice(1))}`;
      }
      if (currentChar === ':') {
        return `${currentChar} ${iter(iterString.slice(1))}`;
      }
      return `${currentChar}${iter(iterString.slice(1))}`;
    };
    return `{\n      ${indent}${iter(string)}\n${indent}  }`;
  }
  return string;
};
