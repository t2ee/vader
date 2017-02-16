import * as Koa from 'koa';

class VaderContext {
    headers: { [key: string]: string };
    params: { [key: string]: string };
    query: { [key: string]: string };
    body: any;
    http: Koa.Context;
    [key: string] : any;
}
export default VaderContext;
