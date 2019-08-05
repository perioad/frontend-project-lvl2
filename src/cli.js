import genDiff from '.';

const program = require('commander');

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');

  program
    .option('-f, --format [type]', 'output format');

  program
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      genDiff(firstConfig, secondConfig);
    });

  program.parse(process.argv);
};
