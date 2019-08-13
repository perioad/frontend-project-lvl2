import { parseIni } from './parsers';

export default class IniFormat {
  constructor(fileName) {
    this.fileName = fileName;
  }

  parse() {
    return parseIni(this.fileName);
  }
}
