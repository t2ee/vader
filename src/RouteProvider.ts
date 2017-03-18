import {
    Provider,
    AutoWiredMeta,
    Container,
} from '@t2ee/core';
import Request from './core/Request';
import ParamHook from './core/ParamHook';

class RouteProvider implements Provider {
    public constructor(private request: Request, private contextProvider: Provider) {
    }

    public get<T>(config: AutoWiredMeta): T {
        const meta: Map<string, any> = config.meta;
        if (meta.get('by-vader')) {
            const type: string = meta.get('type');
            if (type === 'param') {
                const key: string = meta.get('param-key');
                const hook: ParamHook = meta.get('param-hook');

                return hook(this.request, key);
            } else if (type === 'context') {
                return this.contextProvider.get<T>(config);
            }
        }

        return Container.get(config.klass, this);
    }
}

export default RouteProvider;
