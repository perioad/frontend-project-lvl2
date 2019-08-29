import _ from 'lodash';
import parse from './parse';
import plain from './formatters/plainFormat';
import stringify from './utils/stringify';

const makeAST = (fileBefore, fileAfter) => {
  const fileBeforeKeys = Object.keys(fileBefore);
  const fileAfterKeys = Object.keys(fileAfter);
  const preResult = fileBeforeKeys.reduce((acc, key) => {
    if (_.has(fileAfter, key)) {
      if (fileBefore[key] instanceof Object && fileAfter[key] instanceof Object) {
        return [...acc, {
          name: key, type: '', value: '', valuePrevious: '', children: makeAST(fileBefore[key], fileAfter[key]),
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
  const result = fileAfterKeys.reduce(
    (acc, key) => (_.has(fileBefore, key) ? acc : [...acc, {
      name: key, type: 'key added', value: fileAfter[key], valuePrevious: '', children: [],
    }]),
    preResult,
  );
  return result;
};

const renderWithoutCurlyBraces = (ast, indentSmall = '  ', indentBig = '    ') => (
  ast.map((e) => {
    const {
      name,
      type,
      value,
      valuePrevious,
      children,
    } = e;
    const keysTypes = {
      'without changes': `${indentBig}${name}: ${stringify(value, indentBig)}`,
      'key changed': `${indentSmall}+ ${name}: ${stringify(value, indentSmall)}\n${indentSmall}- ${name}: ${stringify(valuePrevious, indentSmall)}`,
      'key added': `${indentSmall}+ ${name}: ${stringify(value, indentSmall)}`,
      'key deleted': `${indentSmall}- ${name}: ${stringify(value, indentSmall)}`,
    };
    if (children.length > 0) {
      const newindentSmall = `${indentSmall}    `;
      const newindentBig = `${indentBig}    `;
      return `${indentBig}${name}: {\n${renderWithoutCurlyBraces(children, newindentSmall, newindentBig)}\n${indentBig}}`;
    }
    return keysTypes[type];
  }).join('\n')
);

const render = ast => `{\n${renderWithoutCurlyBraces(ast)}\n}`;

const renders = {
  undefined: render,
  plain,
};

export default (fileBefore, fileAfter, format) => {
  const fileBeforeParsed = parse(fileBefore);
  const fileAfterParsed = parse(fileAfter);
  const ast = makeAST(fileBeforeParsed, fileAfterParsed);
  const result = renders[format](ast);
  console.log(result);
  return result;
};
