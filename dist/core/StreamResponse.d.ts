/// <reference types="node" />
/// <reference types="koa" />
import Response, { ResponseBuilder } from './Response';
import { Readable } from 'stream';
import * as Koa from 'koa';
declare class StreamResponseBuilder extends ResponseBuilder {
    private _stream;
    constructor(status: number, headers: {
        [key: string]: string;
    }, stream: Readable);
    entity(body: any): StreamResponseBuilder;
    status(status: number): StreamResponseBuilder;
    set(key: string, value: string): StreamResponseBuilder;
    stream(stream: Readable): StreamResponseBuilder;
    build(): StreamResponse;
}
export { StreamResponseBuilder };
export default class StreamResponse extends Response {
    private _stream;
    setBody(body: any): StreamResponse;
    setStream(stream: Readable): StreamResponse;
    setHeaders(headers: {
        [key: string]: string;
    }): StreamResponse;
    setStatus(status: number): StreamResponse;
    push(buffer: Buffer): StreamResponse;
    finish(): StreamResponse;
    send(koaContext: Koa.Context): void;
}
