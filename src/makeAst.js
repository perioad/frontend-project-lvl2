import _ from 'lodash';

const keysTypes = [
  {
    check: (contentBefore, contentAfter, key) => (
      contentBefore[key] instanceof Object && contentAfter[key] instanceof Object
    ),
    type: 'nested',
    process: (childrenAfter, childrenBefore, func) => (
      { children: func(childrenBefore, childrenAfter) }
    ),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] === contentAfter[key]
    ),
    type: 'same',
    process: (after, before) => ({ valueAfter: after, valueBefore: before }),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] !== contentAfter[key]
    ),
    type: 'changed',
    process: (after, before) => ({ valueAfter: after, valueBefore: before }),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && !_.has(contentAfter, key)
    ),
    type: 'deleted',
    process: (after, before) => ({ valueAfter: null, valueBefore: before }),
  },
  {
    check: (contentBefore, contentAfter, key) => (
      !_.has(contentBefore, key)
      && _.has(contentAfter, key)
    ),
    type: 'added',
    process: after => ({ valueAfter: after, valueBefore: null }),
  },
];

const getKeyType = (contentBefore, contentAfter, key) => (
  keysTypes.find(({ check }) => check(contentBefore, contentAfter, key))
);

const makeAst = (contentBefore, contentAfter) => {
  const keys = _.union(Object.keys(contentBefore), Object.keys(contentAfter));
  return keys.map((key) => {
    const {
      type, process,
    } = (
      getKeyType(contentBefore, contentAfter, key)
    );
    const value = process(contentAfter[key], contentBefore[key], makeAst);
    return {
      name: key, type, ...value,
    };
  });
};

export default makeAst;
