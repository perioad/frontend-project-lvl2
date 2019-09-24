import yaml from 'js-yaml';
import ini from 'ini';

export const parseJson = content => JSON.parse(content);

export const parseYaml = content => yaml.safeLoad(content);

export const parseIni = content => ini.parse(content);
