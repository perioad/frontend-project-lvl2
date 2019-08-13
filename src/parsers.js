const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const ini = require('ini');

export const parseJson = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf-8'));

export const parseYaml = file => yaml.safeLoad(fs.readFileSync(path.resolve(file), 'utf-8'));

export const parseIni = file => ini.parse(fs.readFileSync(path.resolve(file), 'utf-8'));
