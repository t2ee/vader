import Router from './Router';
import {
    injections,
} from '@t2ee/core';
import RouterConfiguration from './RouterConfiguration';

class RouterFactory {
    static createRouter(config?: RouterConfiguration): Router {
        const router = injections.Container.get(Router, injections.Container.DefaultProvider);
        if (config) {
            router['routerConfig'] = config;
        }
        return router;
    }
}

export default RouterFactory;