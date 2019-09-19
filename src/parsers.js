import readFile from './utils/readFile';

const yaml = require('js-yaml');
const ini = require('ini');

export const parseJson = fileName => JSON.parse(readFile(fileName), 'utf-8');

export const parseYaml = fileName => yaml.safeLoad(readFile(fileName), 'utf-8');

export const parseIni = fileName => ini.parse(readFile(fileName), 'utf-8');
