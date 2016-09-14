import * as Koa from 'koa';

class VaderContext {
    headers;
    params;
    query;
    body;
    http: Koa.Context;
    [key: string] : any;
}
export default VaderContext;
