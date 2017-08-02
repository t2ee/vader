import {
    Provider,
    AutoWireMeta,
} from '@t2ee/core';
import Request from './Request';
import ContextHook from './ContextHook';

export class ContextProvider implements Provider {
    public resolve<T>(value: T, meta: AutoWireMeta, args: any[]): any {
        try {
        const {
            volatile,
            context,
        }: any = args[0];

        const request: Request = volatile.request;
        if (context.has(meta.declaredType)) {
            return context.get(meta.declaredType)(request);
        }
        const key: string = meta.data.get('key');
        const hook: ContextHook = meta.data.get('hook');

        return hook(request, key);
        }catch(e) {
            console.log(meta, args);
            throw e;
        }
    }

}

const contextProvider: ContextProvider = new ContextProvider();
export default contextProvider;
