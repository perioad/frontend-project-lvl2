import { parseJson, parseYaml, parseIni } from './parsers';

const formats = {
  '.json': content => parseJson(content),
  '.yml': content => parseYaml(content),
  '.ini': content => parseIni(content),
};

export default (format, content) => formats[format](content);
