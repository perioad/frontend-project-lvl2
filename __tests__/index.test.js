import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const pathToFixtures = `${__dirname}/__fixtures__/`;

const expectedFlat = fs.readFileSync(path.resolve(`${pathToFixtures}testFlat.txt`), 'utf-8');
const expectedNested = fs.readFileSync(path.resolve(`${pathToFixtures}testNested.txt`), 'utf-8');
const expectedPlainFormat = fs.readFileSync(path.resolve(`${pathToFixtures}testPlainFormat.txt`), 'utf-8');

const testTableFlat = [
  [
    `${pathToFixtures}before.json`,
    `${pathToFixtures}after.json`,
    expectedFlat,
  ],
  [
    `${pathToFixtures}before.yml`,
    `${pathToFixtures}after.yml`,
    expectedFlat,
  ],
  [
    `${pathToFixtures}before.ini`,
    `${pathToFixtures}after.ini`,
    expectedFlat,
  ],
];

test.each(testTableFlat)(
  'testFlat %#',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

const testTableNested = [
  [
    `${pathToFixtures}beforeTree.json`,
    `${pathToFixtures}afterTree.json`,
    expectedNested,
  ],
  [
    `${pathToFixtures}beforeTree.yml`,
    `${pathToFixtures}afterTree.yml`,
    expectedNested,
  ],
  [
    `${pathToFixtures}beforeTree.ini`,
    `${pathToFixtures}afterTree.ini`,
    expectedNested,
  ],
];

test.each(testTableNested)(
  'testNested %#',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

const testTablePlainFormat = [
  [
    `${pathToFixtures}beforeTree.json`,
    `${pathToFixtures}afterTree.json`,
    expectedPlainFormat,
  ],
];

test.each(testTablePlainFormat)(
  'testPlainFormat %#',
  (a, b, expected) => {
    expect(genDiff(a, b, 'plain')).toBe(expected);
  },
);
