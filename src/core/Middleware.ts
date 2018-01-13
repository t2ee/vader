import * as Koa from 'koa';

type Middleware = (context: Koa.Context, next: () => Promise<any>, variables?: any) => Promise<any>;

export default Middleware
