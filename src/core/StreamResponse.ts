import Response, {ResponseBuilder} from './Response';
import { Readable } from 'stream';
import * as Koa from 'koa';

class StreamResponseBuilder extends ResponseBuilder {
    private _stream: Readable;
    constructor(status: number, headers: {[key: string] : string}, stream: Readable) {
        super(status, headers, null);
        this._status = status;
        this._headers = headers;
        this._stream = stream;
    }

    public entity(body: any): StreamResponseBuilder {
        throw new Error('cannot set body in stream response');
    }

    public status(status: number): StreamResponseBuilder {
        this._status= status;
        return new StreamResponseBuilder(status, this._headers, this._stream);
    }

    public set(key: string, value: string): StreamResponseBuilder {
        const headers = this._headers;
        headers[key] = value;
        return new StreamResponseBuilder(this._status, headers, this._stream);
    }

    public stream(stream: Readable):  StreamResponseBuilder {
        return new StreamResponseBuilder(this._status, this._headers, stream);
    }

    public build(): StreamResponse {
        if (!this._stream) {
            this._stream = new Readable();
            this._stream._read = () => {};
        }
        return new StreamResponse()
            .setHeaders(this._headers)
            .setStream(this._stream)
            .setStatus(this._status);
    }
}

export { StreamResponseBuilder }

export default class StreamResponse extends Response {
    private _stream: Readable;

    public setBody(body: any): StreamResponse {
        throw new Error('cannot set body in stream response');
    }

    public setStream(stream: Readable): StreamResponse {
        this._stream = stream;
        return this;
    }

    public setHeaders(headers: {[key: string] : string}): StreamResponse {
        this._headers = headers;
        return this;
    }

    public setStatus(status: number): StreamResponse {
        this._status = status;
        return this;
    }
    
    public push(buffer: Buffer): StreamResponse {
        this._stream.push(buffer);
        return this;
    }

    public finish(): StreamResponse {
        this._stream.push(null);
        return this;
    }

    public send(koaContext: Koa.Context) {
        for (const key in this._headers) {
            koaContext.set(key, this._headers[key]);
        }
        koaContext.status = this._status;
        koaContext.body = this._stream;
    }
}