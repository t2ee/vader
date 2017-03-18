import Router from './Router';
import {
    Container,
} from '@t2ee/core';
import RouterConfiguration from './RouterConfiguration';

class RouterFactory {
    public static createRouter(config?: RouterConfiguration): Router {
        const router: Router = Container.get(Router, Container.DefaultProvider);
        if (config) {
            router['routerConfig'] = config;
        }

        return router;
    }
}

export default RouterFactory;
