import fs from 'fs';
import path from 'path';
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

export default (fileNameBefore, fileNameAfter, format) => {
  const fileBeforeFormat = path.extname(fileNameBefore);
  const fileAfterFormat = path.extname(fileNameAfter);
  const fileBeforeContent = fs.readFileSync(path.resolve(fileNameBefore), 'utf-8');
  const fileAfterContent = fs.readFileSync(path.resolve(fileNameAfter), 'utf-8');
  const fileBeforeParsed = parse(fileBeforeFormat, fileBeforeContent);
  const fileAfterParsed = parse(fileAfterFormat, fileAfterContent);
  const ast = makeAst(fileBeforeParsed, fileAfterParsed);
  const result = renders[format](ast);
  return result;
};
