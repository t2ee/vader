import {
    injections,
} from '@t2ee/core';
import Request from './core/Request';
import ParamHook from './core/ParamHook';

export default class RouteProvider implements injections.Provider {
    constructor(private request: Request, private contextProvider: injections.Provider) {
    }

    get<T>(config: injections.AutoWiredMeta): T {
        const meta = config.meta;
        if (meta.get('by-vader')) {
            const type = meta.get('type');
            if (type === 'param') {
                const paramType = meta.get('param-type');
                const key = meta.get('param-key');
                const hook: ParamHook = meta.get('param-hook');
                hook(this.request, key);
            } else if (type === 'context') {
                return this.contextProvider.get<T>(config);
            }
        }
        return injections.Container.get(config.klass, this);
    }
}