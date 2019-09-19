import parse from './parse';
import plain from './formatters/plainFormat';
import json from './formatters/jsonFormat';
import makeAst from './makeAst';
import render from './render';

const renders = {
  undefined: render,
  plain,
  json,
};

export default (contentBefore, contentAfter, format) => {
  const contentBeforeParsed = parse(contentBefore);
  const contentAfterParsed = parse(contentAfter);
  const ast = makeAst(contentBeforeParsed, contentAfterParsed);
  const result = renders[format](ast);
  return result;
};
