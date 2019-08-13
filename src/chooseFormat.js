import JsonFormat from './jsonFormat';
import YamlFormat from './yamlFormat';
import IniFormat from './iniFormat';

const path = require('path');


export default (fileName) => {
  if (path.extname(fileName) === '.json') {
    return new JsonFormat(fileName);
  }
  if (path.extname(fileName) === '.ini') {
    return new IniFormat(fileName);
  }
  return new YamlFormat(fileName);
};
