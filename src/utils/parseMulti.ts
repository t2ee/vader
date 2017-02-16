import * as Koa from 'koa';
const formy: any = require('formidable');

export default function parseMulti(koaContext: Koa.Context, opts: any = {}):Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const fields: any = {};
        const files: any = {};
        const form = new formy.IncomingForm(opts);
        form
            .on('end', () => resolve({fields: fields, files: files}))
            .on('error', (err: Error) => reject(err))
            .on('field', (field: any, value: any) => {
                if (fields[field]) {
                    if (Array.isArray(fields[field])) {
                        fields[field].push(value);
                    } else {
                        fields[field] = [fields[field], value];
                    }
                } else {
                    fields[field] = value;
                }
            })
            .on('file', (field: any, file: any) => {
                if (files[field]) {
                    if (Array.isArray(files[field])) {
                        files[field].push(file);
                    } else {
                        files[field] = [files[field], file];
                    }
                } else {
                    files[field] = file;
                }
            });
            if(opts.onFileBegin) {
                form.on('fileBegin', opts.onFileBegin);
            }
            form.parse(koaContext.req);
     });
}
