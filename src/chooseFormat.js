import JsonFormat from './jsonFormat';
import YamlFormat from './yamlFormat';

const path = require('path');


export default (fileName) => {
  if (path.extname(fileName) === '.json') {
    return new JsonFormat(fileName);
  }
  return new YamlFormat(fileName);
};
