"use strict";
const Response_1 = require("./Response");
const stream_1 = require("stream");
class StreamResponseBuilder extends Response_1.ResponseBuilder {
    constructor(status, headers, stream) {
        super(status, headers, null);
        this._status = status;
        this._headers = headers;
        this._stream = stream;
    }
    entity(body) {
        throw new Error('cannot set body in stream response');
    }
    status(status) {
        this._status = status;
        return new StreamResponseBuilder(status, this._headers, this._stream);
    }
    set(key, value) {
        const headers = this._headers;
        headers[key] = value;
        return new StreamResponseBuilder(this._status, headers, this._stream);
    }
    stream(stream) {
        return new StreamResponseBuilder(this._status, this._headers, stream);
    }
    build() {
        if (!this._stream) {
            this._stream = new stream_1.Readable();
            this._stream._read = () => { };
        }
        return new StreamResponse()
            .setHeaders(this._headers)
            .setStream(this._stream)
            .setStatus(this._status);
    }
}
exports.StreamResponseBuilder = StreamResponseBuilder;
class StreamResponse extends Response_1.default {
    setBody(body) {
        throw new Error('cannot set body in stream response');
    }
    setStream(stream) {
        this._stream = stream;
        return this;
    }
    setHeaders(headers) {
        this._headers = headers;
        return this;
    }
    setStatus(status) {
        this._status = status;
        return this;
    }
    push(buffer) {
        this._stream.push(buffer);
        return this;
    }
    finish() {
        this._stream.push(null);
        return this;
    }
    send(koaContext) {
        for (const key in this._headers) {
            koaContext.set(key, this._headers[key]);
        }
        koaContext.status = this._status;
        koaContext.body = this._stream;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StreamResponse;
//# sourceMappingURL=StreamResponse.js.map