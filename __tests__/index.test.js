import genDiff from '../src';

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('flat files compare json', () => {
  expect(genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toBe(result);
});

test('flat files compare yml', () => {
  expect(genDiff(`${__dirname}/__fixtures__/before.yml`, `${__dirname}/__fixtures__/after.yml`)).toBe(result);
});

test('flat files compare json and yml', () => {
  expect(genDiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.yml`)).toBe(result);
});
