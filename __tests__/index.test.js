import fs from 'fs';
import genDiff from '../src';

test.each([
  ['json', '', 'testNested.txt'], ['yml', '', 'testNested.txt'], ['ini', '', 'testNested.txt'],
  ['json', 'plain', 'testPlain.txt'], ['yml', 'plain', 'testPlain.txt'], ['ini', 'plain', 'testPlain.txt'],
  ['json', 'json', 'testJson.txt'], ['yml', 'json', 'testJson.txt'], ['ini', 'json', 'testJson.txt'],
])(
  'test %#',
  (formatOfFile, formatOfRender, expected) => {
    const pathToFixtures = `${__dirname}/__fixtures__/`;
    const pathFileBefore = `${pathToFixtures}before.${formatOfFile}`;
    const pathFileAfter = `${pathToFixtures}after.${formatOfFile}`;
    const shouldBe = fs.readFileSync(`${pathToFixtures}${expected}`, 'utf-8');
    expect(genDiff(pathFileBefore, pathFileAfter, formatOfRender)).toBe(shouldBe);
  },
);
