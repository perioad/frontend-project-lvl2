#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
// const yaml = require('js-yaml');
// const ini = require('ini');

console.log('Here your own tests, man! :)');

// console.log(path.resolve('before.ini'));
// console.log(fs.readFileSync(path.resolve('before.ini')));
console.log(JSON.parse(fs.readFileSync(path.resolve('before.json'), 'utf-8')));
console.log(JSON.parse(fs.readFileSync(path.resolve('after.json'), 'utf-8')));
