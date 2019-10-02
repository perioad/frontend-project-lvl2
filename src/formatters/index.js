import standart from './standartFormat';
import plain from './plainFormat';
import json from './jsonFormat';

const renders = {
  plain,
  json,
};

export default (ast, format) => (format ? renders[format](ast) : standart(ast));
