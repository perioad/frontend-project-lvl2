import genDiff from '../src';

const path = require('path');
const fs = require('fs');

const pathToFixtures = `${__dirname}/__fixtures__/`;

const expectFlat = fs.readFileSync(path.resolve(`${pathToFixtures}testFlat.txt`), 'utf-8');
const expectTree = fs.readFileSync(path.resolve(`${pathToFixtures}testTree.txt`), 'utf-8');

const testTableFlat = [
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

const testTableTree = [
  [
    `${pathToFixtures}beforeTree.json`,
    `${pathToFixtures}afterTree.json`,
    expectTree,
  ],
  [
    `${pathToFixtures}beforeTree.yml`,
    `${pathToFixtures}afterTree.yml`,
    expectTree,
  ],
  [
    `${pathToFixtures}beforeTree.ini`,
    `${pathToFixtures}afterTree.ini`,
    expectTree,
  ],
];

test.each(testTableFlat)(
  'testFlat %#',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(testTableTree)(
  'testTree %#',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
