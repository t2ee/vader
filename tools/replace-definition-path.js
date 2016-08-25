'use strict';
const fs = require('fs');
const path = require('path');

function scan(dir, extension) {
    let result = [];
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const stat = fs.statSync(path.resolve(dir, f));
        if (stat.isDirectory()) {
            result = result.concat(scan(path.resolve(dir, f), extension));
        } else {
            if (extension) {
                if (f.substr(f.length - extension.length, f.length) === extension) {
                    result.push(path.resolve(dir, f));
                }
            } else {
                result.push(f);
            }
        }

    }
    return result;
}

const files = scan(path.resolve(__dirname, '../dist'), '.d.ts');

const packageJson = require('../package.json')
const dependencies = Object.keys(packageJson.devDependencies)
                        .concat(Object.keys(packageJson.dependencies));


for (const file of files) {
    let content = fs.readFileSync(file).toString();
    content = content.replace(/import [\w\d\*\_\s]+ from (.+)\n/gi, function (script, name) {
        const orig = name;
        if (name[0] === `'` ||
            name[0] === `"`) {
            name = name.substr(1);
        }
        if (name[name.length - 1] === ';') {
            name = name.substr(0, name.length - 1);
        }
        if (name[name.length - 1] === `'` ||
            name[name.length - 1] === `"`) {
            name = name.substr(0, name.length - 1);
        }

        if (~dependencies.indexOf(name)) {
            return script;
        }

        if (name[0] === '.') {
            return script;
        }

        let startPos = script.indexOf(orig);
        let length = orig.length;
        let result = `${script.substr(0, startPos)} '../${name}';\n`;
        console.log(`${script} -> ${result}`)
        return result;
    });
    fs.writeFileSync(file, content);
}
