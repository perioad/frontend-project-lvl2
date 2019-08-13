import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const pathToFixtures = `${__dirname}/__fixtures__/`;

const expectFlat = fs.readFileSync(path.resolve(`${pathToFixtures}testFlat.txt`), 'utf-8');

const testTable = [
  [
    `${pathToFixtures}before.json`,
    `${pathToFixtures}after.json`,
    expectFlat,
  ],
  [
    `${pathToFixtures}before.yml`,
    `${pathToFixtures}after.yml`,
    expectFlat,
  ],
  [
    `${pathToFixtures}before.ini`,
    `${pathToFixtures}after.ini`,
    expectFlat,
  ],
];

test.each(testTable)(
  'test',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
