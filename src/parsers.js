const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

export const parseJson = file => JSON.parse(fs.readFileSync(path.resolve(file)));

export const parseYaml = file => yaml.safeLoad(fs.readFileSync(path.resolve(file)));
