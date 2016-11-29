'use strict';
const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    const result = [];
    for (const file of files) {
        const p = path.resolve(dir, file)
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            result.push(...walk(p));
        } else {
          result.push(p);
        }
    }
    return result;
}

try {
  fs.unlinkSync('./src/index.ts');
} catch (e) {

}
const files = walk('./src').map(f => path.relative('./src', f));
let output = '';
for (const file of files) {
  const extname = path.extname(file);
  const module = path.basename(file, extname);
  output += `export { default as ${module}} from './${file.slice(0, -extname.length)}';\n`
}


fs.writeFileSync('./src/index.ts', output);
