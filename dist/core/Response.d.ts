/// <reference types="koa" />
import * as Koa from 'koa';
declare class ResponseBuilder {
    protected _status: number;
    protected _headers: {
        [key: string]: string;
    };
    protected _body: any;
    constructor(status: number, headers: {
        [key: string]: string;
    }, body: any);
    entity(body: any): ResponseBuilder;
    status(status: number): ResponseBuilder;
    set(key: string, value: string): ResponseBuilder;
    build(): Response;
}
export { ResponseBuilder };
export default class Response extends ResponseBuilder {
    constructor();
    setHeaders(headers: {
        [key: string]: string;
    }): Response;
    setBody(body: any): Response;
    setStatus(status: number): Response;
    send(koaContext: Koa.Context): void;
}
