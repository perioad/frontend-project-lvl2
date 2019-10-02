import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAst from './makeAst';
import render from './formatters';

export default (fileNameBefore, fileNameAfter, format) => {
  const formatOfFileBefore = path.extname(fileNameBefore);
  const formatOfFileAfter = path.extname(fileNameAfter);
  const contentOfFileBefore = fs.readFileSync(path.resolve(fileNameBefore), 'utf-8');
  const contentOfFileAfter = fs.readFileSync(path.resolve(fileNameAfter), 'utf-8');
  const fileBeforeParsed = parse(formatOfFileBefore, contentOfFileBefore);
  const fileAfterParsed = parse(formatOfFileAfter, contentOfFileAfter);
  const ast = makeAst(fileBeforeParsed, fileAfterParsed);
  const result = render(ast, format);
  return result;
};
