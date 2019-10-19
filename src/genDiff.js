import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAst from './makeAst';
import render from './formatters';

const extensions = {
  '.json': 'json',
  '.yml': 'yaml',
  '.ini': 'ini',
};

export default (fileNameBefore, fileNameAfter, format) => {
  const extensionOfFileBefore = path.extname(fileNameBefore);
  const extensionOfFileAfter = path.extname(fileNameAfter);
  const formatOfFileBefore = extensions[extensionOfFileBefore];
  const formatOfFileAfter = extensions[extensionOfFileAfter];
  const contentOfFileBefore = fs.readFileSync(path.resolve(fileNameBefore), 'utf-8');
  const contentOfFileAfter = fs.readFileSync(path.resolve(fileNameAfter), 'utf-8');
  const fileBeforeParsed = parse(formatOfFileBefore, contentOfFileBefore);
  const fileAfterParsed = parse(formatOfFileAfter, contentOfFileAfter);
  const ast = makeAst(fileBeforeParsed, fileAfterParsed);
  const result = render(ast, format);
  return result;
};
