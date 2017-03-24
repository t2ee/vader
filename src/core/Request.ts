import * as Koa from 'koa';
import HttpMethod from '../enums/HttpMethod';

class Request {
    private _path: string = '';
    private _url: string = '';
    private _method: HttpMethod = null;
    private _query: Map<string, string> = new Map<string, string>();
    private _params: Map<string, string> = new Map<string, string>();
    private _body: any;
    private _headers: Map<string, string> = new Map<string, string>();
    private _version: string = '1.0';
    private _context: Koa.Context;
    private _extra: Map<string, any> = new Map<string, any>();

    public constructor(context: Koa.Context, params: Map<string, string>) {
        this._path = context.request.path;
        this._url = context.request.url;
        this._params = params;
        for (const key in context.request.headers) {
            this._headers.set(key, context.request.headers[key]);
        }
        for (const key in context.request.query) {
            this._query.set(key, context.request.query[key]);
        }
        this._version = context.request.protocol;
        this._method = HttpMethod[context.method.toUpperCase() as any] as any;
        this._context = context;
    }

    public get url(): string {
        return this._url;
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

    public set body(body: any) {
        this._body = body;
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

    public get extra(): Map<string, any> {
        return this._extra;
    }

}

export default Request;
