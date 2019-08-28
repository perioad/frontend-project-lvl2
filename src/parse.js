import { parseJson, parseYaml, parseIni } from './parsers';

const path = require('path');

const formats = {
  '.json': f => parseJson(f),
  '.yml': f => parseYaml(f),
  '.ini': f => parseIni(f),
};

export default fileName => formats[path.extname(fileName)](fileName);
