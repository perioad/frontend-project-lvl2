import genDiff from '../src';
import readFile from '../src/utils/readFile';

const pathToFixtures = `${__dirname}/__fixtures__/`;

const expectedNested = readFile(`${pathToFixtures}testNested.txt`);
const expectedPlain = readFile(`${pathToFixtures}testPlain.txt`);
const expectedJson = readFile(`${pathToFixtures}testJson.txt`);

const expectedFormats = {
  nested: expectedNested,
  plain: expectedPlain,
  json: expectedJson,
};

const testTable = [
  [
    `${pathToFixtures}before.json`,
    `${pathToFixtures}after.json`,
    expectedFormats,
  ],
  [
    `${pathToFixtures}before.yml`,
    `${pathToFixtures}after.yml`,
    expectedFormats,
  ],
  [
    `${pathToFixtures}before.ini`,
    `${pathToFixtures}after.ini`,
    expectedFormats,
  ],
];

test.each(testTable)(
  'testNested %#',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected.nested);
  },
);

test.each(testTable)(
  'testPlainFormat %#',
  (a, b, expected) => {
    expect(genDiff(a, b, 'plain')).toBe(expected.plain);
  },
);

test.each(testTable)(
  'testJsonFormat %#',
  (a, b, expected) => {
    expect(genDiff(a, b, 'json')).toBe(expected.json);
  },
);
