import * as Koa from 'koa';

class ResponseBuilder {
    protected _status: number = 200;
    protected _headers: {[key: string] : string} = {};
    protected _body: any = '';

    constructor(status: number, headers: {[key: string] : string}, body: any) {
        this._status = status;
        this._headers = headers;
        this._body = body;
    }

    public entity(body: any): ResponseBuilder {
        return new ResponseBuilder(this._status, this._headers, body);
    }

    public status(status: number): ResponseBuilder {
        return new ResponseBuilder(status, this._headers, this._body);
    }

    public set(key: string, value: string): ResponseBuilder {
        const headers = this._headers;
        headers[key] = value;
        return new ResponseBuilder(this._status, headers, this._body);
    }

    public build(): Response {
        return new Response()
            .setHeaders(this._headers)
            .setBody(this._body)
            .setStatus(this._status);
    }
}
export { ResponseBuilder };
export default class Response extends ResponseBuilder {
    constructor() {
        super(404, {}, '');
    }
    public setHeaders(headers: {[key: string] : string}): Response {
        this._headers = headers;
        return this;
    }
    public setBody(body: any): Response {
        this._body = body;
        return this;
    }
    public setStatus(status: number): Response {
        this._status = status;
        return this;
    }
    public send(koaContext: Koa.Context) {
        koaContext.body = this._body;
        for (const key in this._headers) {
            koaContext.set(key, this._headers[key]);
        }
        koaContext.status = this._status;

    }
}
