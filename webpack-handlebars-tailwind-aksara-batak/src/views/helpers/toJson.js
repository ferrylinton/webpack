const fs = require('fs');
const path = require('path');

module.exports = function (options) {
  const context = this;
  const { key, file } = options.hash;

  const json =  JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src", "json", file), 'utf-8'));
  context[key] = json;
};
