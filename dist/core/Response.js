"use strict";
class Response {
    constructor() {
        this._body = 'Not Found';
        this._status = 404;
        this._headers = new Map();
    }
    get body() {
        return this._body;
    }
    get status() {
        return this._status;
    }
    get headers() {
        return this._headers;
    }
    set body(body) {
        this._body = body;
    }
    set status(status) {
        this._status = status;
    }
    set headers(headers) {
        this._headers = headers;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Response;
//# sourceMappingURL=Response.js.map