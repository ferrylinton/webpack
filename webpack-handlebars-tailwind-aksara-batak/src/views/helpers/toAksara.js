const fs = require('fs');
const path = require('path');
const { getUnicode } = require('../../js/aksara');

module.exports = function (options) {
  const context = this;
  const { key, file } = options.hash;

  const json = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src", "json", file), 'utf-8'));

  json.forEach(group => {
    Object.keys(group).forEach(key => {
      if (key === 'samples') {
        group['samples'].forEach(obj => {
          obj['aksara'] = getUnicode(obj['aksara']);
        })
      }
    })

  })

  context[key] = json;
};
