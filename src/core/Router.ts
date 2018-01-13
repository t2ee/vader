import * as Koa from 'koa';
import * as pathToRegexp from 'path-to-regexp';
import {
    Container,
    Metadata,
} from '@t2ee/core';

import compose from './compose';
import Middleware from './Middleware';
import ContextProvider from '../context/ContextProvider';
import Route from './Route';

const routeMiddleware = (route: Route) => {
    return async (context: Koa.Context, next: () => Promise<any>, variables: any) => {
        const path = context.path;
        const method = context.method.toUpperCase();
        const produce = context.get('accept');
        const consume = context.get('content-type');

        if (route.produce && produce.indexOf(route.produce) === -1) {
            await next();
            return;
        }

        if (route.consume && consume.indexOf(route.consume) === -1) {
            await next();
            return;
        }

        if (method !== route.method) {
            await next();
            return;
        }

        const result = route.path.exec(path);
        if (!result) {
            await next();
            return;
        }

        const query = context.query;
        const headers = context.headers;

        const params: any = {};
        let paramIndex = 1;
        for (const param of route.params) {
            params[param.name] = result[paramIndex];
            paramIndex++;
        }

        let response = route.func(context, params, variables);
        if (response instanceof Promise) {
            response = await response;
        }
        context.response.body = response;
        await next();
    };
}

type MiddlewareLayer = Middleware[];


export default class Router {

    private layers: MiddlewareLayer[] = [];

    constructor(contextProvider: new (...args) => ContextProvider = ContextProvider) {
        Container.register(Symbol.for('t2ee:vader:context'), contextProvider);
    }

    public routes() {
        const stacks: any[] = [];
        for (const layer of this.layers) {
            stacks.push(compose(layer));
        }
        const stack = compose(stacks);
        return async (context: Koa.Context, next: () => Promise<any>): Promise<any> => {
            const variables: any = {};
            await stack(context, next, variables);
        }
    }

    public use(...middlewares: Array<Middleware | (new (...args) => any)>) {
        if (!middlewares.length) {
            return;
        }
        const layer: MiddlewareLayer = [];
        for (const middleware of middlewares) {
            const classMeta = Metadata.get('t2ee:vader:metadata:class', middleware) || {};
            if (classMeta.controller) {
                const target = middleware as (new (...args) => any)
                const parameterMeta = Metadata.get('t2ee:vader:metadata:parameter', target.prototype) || {}
                const propertyMeta = Metadata.get('t2ee:vader:metadata:property', target.prototype) || {}
                let rootPath = classMeta.path || '/';
                if (rootPath[0] !== '/') {
                    rootPath = '/' + rootPath;
                }
                if (rootPath[rootPath.length - 1] === '/') {
                    rootPath = rootPath.substr(0, rootPath.length - 1);
                }

                const controller = Container.get(target);

                for (const key in propertyMeta) {
                    const meta = propertyMeta[key];
                    if (meta.method) {
                        let path = meta.path || '';
                        if (path[0] === '/') {
                            path = path.substr(1);
                        }
                        path = rootPath + '/' + path;
                        const params = [];
                        const re = pathToRegexp(path, params);
                        layer.push(routeMiddleware({
                            path: re,
                            params: params,
                            consume: meta.consume || (classMeta.consume || meta.consume),
                            produce: meta.produce || (classMeta.produce || meta.produce),
                            method: meta.method,
                            func: controller[key],
                        }));
                    }
                }
            } else {
                layer.push(middleware as Middleware);
            }
        }
        this.layers.push(layer);
    }
}
