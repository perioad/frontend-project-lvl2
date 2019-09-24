import path from 'path';
import fs from 'fs';

export default fileName => fs.readFileSync(path.resolve(fileName), 'utf-8');
