import _ from 'lodash';

const keysTypes = [
  {
    check: (contentBefore, contentAfter, key) => (
      contentBefore[key] instanceof Object && contentAfter[key] instanceof Object
    ),
    type: 'nested',
    process: (childrenBefore, childrenAfter, func) => func(childrenBefore, childrenAfter),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] === contentAfter[key]
    ),
    type: 'same',
    process: (valueBefore, valueAfter) => valueAfter,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] !== contentAfter[key]
    ),
    type: 'changed',
    process: (valueBefore, valueAfter) => valueAfter,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && !_.has(contentAfter, key)
    ),
    type: 'deleted',
    process: () => null,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      !_.has(contentBefore, key)
      && _.has(contentAfter, key)
    ),
    type: 'added',
    process: (valueBefore, valueAfter) => valueAfter,
  },
];

const getKeyType = (contentBefore, contentAfter, key) => (
  keysTypes.find(({ check }) => check(contentBefore, contentAfter, key))
);

const makeAst = (contentBefore, contentAfter) => {
  const keys = _.union(Object.keys(contentBefore), Object.keys(contentAfter));
  return keys.map((key) => {
    const { type, process } = getKeyType(contentBefore, contentAfter, key);
    const valueAfter = process(contentBefore[key], contentAfter[key], makeAst);
    const valueBefore = contentBefore[key] || null;
    return {
      name: key, type, valueAfter, valueBefore,
    };
  });
};

export default makeAst;
