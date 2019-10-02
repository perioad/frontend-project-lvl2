import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  '.json': content => JSON.parse(content),
  '.yml': content => yaml.safeLoad(content),
  '.ini': content => ini.parse(content),
};

export default (format, content) => formats[format](content);
