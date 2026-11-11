/* EngLift — спільне для tools/pics: завантаження слів частини мови з даних застосунку */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const APP = path.join(__dirname, '..', '..', 'english-app');
const SRC = {
  nouns: { name: 'LEX_NOUNS', files: ['nouns-data.js', 'nouns-oxford-data.js'] }
};

function loadPos(pos) {
  const s = SRC[pos];
  if (!s) throw new Error('невідома частина мови: ' + pos + ' (є: ' + Object.keys(SRC).join(', ') + ')');
  const ctx = { window: {} };
  vm.createContext(ctx);
  const code = s.files.map(f => fs.readFileSync(path.join(APP, 'js', 'lexis', f), 'utf8')).join('\n;\n') +
    '\n;this.__words = ' + s.name + ';';
  vm.runInContext(code, ctx);
  return ctx.__words;
}

module.exports = { APP, loadPos };
