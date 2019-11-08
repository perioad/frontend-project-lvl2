import _ from 'lodash';

const keysTypes = [
  {
    check: (contentBefore, contentAfter, key) => (
      contentBefore[key] instanceof Object && contentAfter[key] instanceof Object
    ),
    type: 'nested',
    processValueAfter: (childrenAfter, childrenBefore, func) => func(childrenBefore, childrenAfter),
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] === contentAfter[key]
    ),
    type: 'same',
    processValueAfter: _.identity,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] !== contentAfter[key]
    ),
    type: 'changed',
    processValueAfter: _.identity,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && !_.has(contentAfter, key)
    ),
    type: 'deleted',
    processValueAfter: () => null,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      !_.has(contentBefore, key)
      && _.has(contentAfter, key)
    ),
    type: 'added',
    processValueAfter: _.identity,
    processValueBefore: () => null,
  },
];

const getKeyType = (contentBefore, contentAfter, key) => (
  keysTypes.find(({ check }) => check(contentBefore, contentAfter, key))
);

const makeAst = (contentBefore, contentAfter) => {
  const keys = _.union(Object.keys(contentBefore), Object.keys(contentAfter));
  return keys.map((key) => {
    const {
      type, processValueAfter, processValueBefore,
    } = (
      getKeyType(contentBefore, contentAfter, key)
    );
    const valueAfter = processValueAfter(contentAfter[key], contentBefore[key], makeAst);
    const valueBefore = processValueBefore(contentBefore[key]);
    const valueOrChildren = type === 'nested' ? 'children' : 'valueAfter';
    return {
      name: key, type, [valueOrChildren]: valueAfter, valueBefore,
    };
  });
};

export default makeAst;
