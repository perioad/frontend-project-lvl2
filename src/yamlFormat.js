import { parseYaml } from './parsers';

export default class YamlFormat {
  constructor(fileName) {
    this.fileName = fileName;
  }

  parse() {
    return parseYaml(this.fileName);
  }
}
