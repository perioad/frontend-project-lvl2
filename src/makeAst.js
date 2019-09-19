import _ from 'lodash';

const keysTypes = [
  {
    check: (contentBefore, contentAfter, key) => (
      contentBefore[key] instanceof Object && contentAfter[key] instanceof Object
    ),
    type: 'nested',
    process: (valueBefore, valueAfter, func) => func(valueBefore, valueAfter),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] === contentAfter[key]
    ),
    type: 'without changes',
    process: (valueBefore, valueAfter) => valueAfter,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] !== contentAfter[key]
    ),
    type: 'key changed',
    process: (valueBefore, valueAfter) => (
      { old: valueBefore, new: valueAfter }
    ),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && !_.has(contentAfter, key)
    ),
    type: 'key deleted',
    process: valueBefore => valueBefore,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      !_.has(contentBefore, key)
      && _.has(contentAfter, key)
    ),
    type: 'key added',
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
    const value = process(contentBefore[key], contentAfter[key], makeAst);
    return { name: key, type, value };
  });
};

export default makeAst;
