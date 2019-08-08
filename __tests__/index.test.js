import genDiff from '../src';

const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('flat files compare', () => {
  console.log(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json'));
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe(result);
});
