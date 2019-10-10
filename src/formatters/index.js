import nested from './nestedFormat';
import plain from './plainFormat';
import json from './jsonFormat';

const renders = {
  plain,
  json,
};

export default (ast, format) => (format ? renders[format](ast) : nested(ast));
