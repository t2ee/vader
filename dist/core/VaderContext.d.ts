/// <reference types="koa" />
import * as Koa from 'koa';
declare class VaderContext {
    headers: any;
    params: any;
    query: any;
    body: any;
    http: Koa.Context;
    [key: string]: any;
}
export default VaderContext;
