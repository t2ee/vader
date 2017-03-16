import * as Koa from 'koa';
import HttpMethod from '../enums/HttpMethod';

class Request {
    private _path: string = '';
    private _method: HttpMethod = null;
    private _query = new Map<string, string>();
    private _params = new Map<string, string>();
    private _body: any;
    private _headers = new Map<string, string>();
    private _version = '1.0';
    private _context: Koa.Context;
    private _extra = new Map<string, string>();

    constructor(context: Koa.Context, params: Map<string, string>) {
        this._path = context.request.path;
        this._params = params;
        for (const key in context.request.headers) {
            this._headers.set(key, context.request.headers[key]);
        }
        for (const key in context.request.query) {
            this._query.set(key, context.request.query[key]);
        }
        this._version = context.request.protocol;
        this._method = HttpMethod[context.method.toUpperCase() as any] as any
    }

    public get path(): string {
        return this._path;
    }

    public get method(): HttpMethod {
        return this._method;
    }

    public get context(): Koa.Context {
        return this._context;
    }

    public get body(): any {
        return this._body;
    }

    public get version(): string {
        return this._version;
    }

    public get query(): Map<string, string> {
        return new Map(this._query);
    }

    public get params(): Map<string, string> {
        return new Map(this._params);
    }

    public get headers(): Map<string, string> {
        return new Map(this._headers);
    }

    public get extra(): Map<string, string> {
        return this._extra;
    }

}

export default Request;