'use strict';
const fs = require('fs');
const path = require('path');

function walk(dir) {
    const result = [];
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const file = path.resolve(dir, f);
        if (fs.statSync(file).isDirectory()) {
            result.push(...walk(file));
        } else {
            result.push(file);
        }
    }
    return result;
}

const pairs = walk(path.resolve(__dirname, './src'))
    .map(file => path.relative(path.resolve(__dirname, 'src'), file))
    .map(file => {
        const basename = path.basename(file, path.extname(file));
        file = './' + file.substr(0, file.length - 3);
        return [
            file,
            basename,
        ];
    });

const names = [];
let index = '';
for (const [file, basename] of pairs) {
    index += `import ${basename} from '${file}';\n`;
    names.push(basename);
}

index += '\n';
index += 'export {\n';

for (const name of names) {
  index += `    ${name},\n`;
}

index += '};\n';

console.log(index);
