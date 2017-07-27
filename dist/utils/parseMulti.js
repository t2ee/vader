"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formy = require('formidable');
function parseMulti(koaContext, opts = {}) {
    return new Promise((resolve, reject) => {
        const fields = {};
        const files = {};
        const form = new formy.IncomingForm(opts);
        form
            .on('end', () => resolve({ fields: fields, files: files }))
            .on('error', (err) => reject(err))
            .on('field', (field, value) => {
            if (fields[field]) {
                if (Array.isArray(fields[field])) {
                    fields[field].push(value);
                }
                else {
                    fields[field] = [fields[field], value];
                }
            }
            else {
                fields[field] = value;
            }
        })
            .on('file', (field, file) => {
            if (files[field]) {
                if (Array.isArray(files[field])) {
                    files[field].push(file);
                }
                else {
                    files[field] = [files[field], file];
                }
            }
            else {
                files[field] = file;
            }
        });
        if (opts.onFileBegin) {
            form.on('fileBegin', opts.onFileBegin);
        }
        form.parse(koaContext.req);
    });
}
exports.default = parseMulti;
//# sourceMappingURL=parseMulti.js.map