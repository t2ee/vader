"use strict";
class ResponseBuilder {
    constructor(status, headers, body) {
        this._status = 200;
        this._headers = {};
        this._body = '';
        this._status = status;
        this._headers = headers;
        this._body = body;
    }
    entity(body) {
        return new ResponseBuilder(this._status, this._headers, body);
    }
    status(status) {
        return new ResponseBuilder(status, this._headers, this._body);
    }
    set(key, value) {
        const headers = this._headers;
        headers[key] = value;
        return new ResponseBuilder(this._status, headers, this._body);
    }
    build() {
        return new Response()
            .setHeaders(this._headers)
            .setBody(this._body)
            .setStatus(this._status);
    }
}
exports.ResponseBuilder = ResponseBuilder;
class Response extends ResponseBuilder {
    constructor() {
        super(404, {}, '');
    }
    setHeaders(headers) {
        this._headers = headers;
        return this;
    }
    setBody(body) {
        this._body = body;
        return this;
    }
    setStatus(status) {
        this._status = status;
        return this;
    }
    send(koaContext) {
        koaContext.body = this._body;
        for (const key in this._headers) {
            koaContext.set(key, this._headers[key]);
        }
        koaContext.status = this._status;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Response;
//# sourceMappingURL=Response.js.map