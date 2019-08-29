#!/usr/bin/env node

import genDiff from '../genDiff';

const program = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    genDiff(firstConfig, secondConfig, program.format);
  });

program.parse(process.argv);
