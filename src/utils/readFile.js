const path = require('path');
const fs = require('fs');

export default fileName => fs.readFileSync(path.resolve(fileName), 'utf-8');
