import _ from 'lodash';

const keysTypes = [
  {
    check: (contentBefore, contentAfter, key) => (
      contentBefore[key] instanceof Object && contentAfter[key] instanceof Object
    ),
    type: 'nested',
    processChildren: (childrenBefore, childrenAfter, func) => func(childrenBefore, childrenAfter),
    processValueAfter: _.identity,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && _.has(contentAfter, key)
      && contentBefore[key] === contentAfter[key]
    ),
    type: 'same',
    processChildren: () => [],
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
    processChildren: () => [],
    processValueAfter: _.identity,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      _.has(contentBefore, key)
      && !_.has(contentAfter, key)
    ),
    type: 'deleted',
    processChildren: () => [],
    processValueAfter: () => null,
    processValueBefore: _.identity,
  },
  {
    check: (contentBefore, contentAfter, key) => (
      !_.has(contentBefore, key)
      && _.has(contentAfter, key)
    ),
    type: 'added',
    processChildren: () => [],
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
      type, processChildren, processValueAfter, processValueBefore,
    } = (
      getKeyType(contentBefore, contentAfter, key)
    );
    const children = processChildren(contentBefore[key], contentAfter[key], makeAst);
    const valueAfter = processValueAfter(contentAfter[key]);
    const valueBefore = processValueBefore(contentBefore[key]);
    return {
      name: key, type, valueAfter, valueBefore, children,
    };
  });
};

export default makeAst;
