import * as Koa from 'koa';
import Middleware from './Middleware';

export default function compose(middlewares: Middleware[]) {
    return async (context: Koa.Context, next: () => Promise<any>, variables: any) => {
        let index = -1;
        const dispatch = async (i) => {
            if (i <= index) {
                throw new Error('next() called multiple times');
            }
            index = i;
            let fn: any = middlewares[i];
            if (i === middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return;
            }
            return await fn(context, async () => {
                return await dispatch(i + 1);
            }, variables);
        };
        return await dispatch(0);
    };
}
