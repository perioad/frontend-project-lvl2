import _ from 'lodash';
import parse from './parse';

const makeAstWithoutRoot = (fileBefore, fileAfter) => {
  const preResult = Object.keys(fileBefore).reduce((acc, key) => {
    if (_.has(fileAfter, key)) {
      if (fileBefore[key] instanceof Object && fileAfter[key] instanceof Object) {
        return [...acc, {
          name: key, type: '', value: '', valuePrevious: '', children: makeAstWithoutRoot(fileBefore[key], fileAfter[key]),
        }];
      }
      if (fileBefore[key] === fileAfter[key]) {
        return [...acc, {
          name: key, type: 'without changes', value: fileAfter[key], valuePrevious: '', children: [],
        }];
      }
      return [...acc, {
        name: key, type: 'key changed', value: fileAfter[key], valuePrevious: fileBefore[key], children: [],
      }];
    }
    return [...acc, {
      name: key, type: 'key deleted', value: fileBefore[key], valuePrevious: '', children: [],
    }];
  }, []);
  const result = Object.keys(fileAfter).reduce(
    (acc, key) => (_.has(fileBefore, key) ? acc : [...acc, {
      name: key, type: 'key added', value: fileAfter[key], valuePrevious: '', children: [],
    }]),
    preResult,
  );
  return result;
};

const makeAST = (fileBefore, fileAfter) => {
  const astWithoutRoot = makeAstWithoutRoot(fileBefore, fileAfter);
  return {
    name: 'root',
    type: '',
    value: '',
    valuePrevious: '',
    children: astWithoutRoot,
  };
};

const stringify = (value, indent) => {
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

const render = (ast, indentSmall = '  ', indentBig = '    ') => {
  const {
    name,
    type,
    value,
    valuePrevious,
    children,
  } = ast;
  if (name === 'root') {
    return `{\n${children.map(node => render(node)).join('\n')}\n}`;
  }
  const keysTypes = {
    'without changes': `${indentBig}${name}: ${stringify(value, indentBig)}`,
    'key changed': `${indentSmall}+ ${name}: ${stringify(value, indentSmall)}\n${indentSmall}- ${name}: ${stringify(valuePrevious, indentSmall)}`,
    'key added': `${indentSmall}+ ${name}: ${stringify(value, indentSmall)}`,
    'key deleted': `${indentSmall}- ${name}: ${stringify(value, indentSmall)}`,
  };
  if (children.length > 0) {
    const newindentSmall = `${indentSmall}    `;
    const newindentBig = `${indentBig}    `;
    return `${indentBig}${name}: {\n${children.map(node => render(node, newindentSmall, newindentBig)).join('\n')}\n${indentBig}}`;
  }
  return keysTypes[type];
};

export default (fileBefore, fileAfter) => {
  const fileBeforeParsed = parse(fileBefore);
  const fileAfterParsed = parse(fileAfter);
  const ast = makeAST(fileBeforeParsed, fileAfterParsed);
  const result = render(ast);
  console.log(result);
  return result;
};
