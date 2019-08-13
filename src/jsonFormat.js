import { parseJson } from './parsers';

export default class JsonFormat {
  constructor(fileName) {
    this.fileName = fileName;
  }

  parse() {
    return parseJson(this.fileName);
  }
}
