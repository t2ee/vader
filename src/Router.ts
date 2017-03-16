import * as pathToRegexp from 'path-to-regexp';
import * as Koa from 'koa';
import {
    injections,
    utils,
    ClassConstructor,
} from '@t2ee/core';
import {
    LogManager,
} from 'sl4js';
import RouterConfiguration from './RouterConfiguration';


import AfterMiddleware from './core/AfterMiddleware';
import BeforeMiddleware from './core/BeforeMiddleware';
import Provider from './Provider';
import HttpMethod from './enums/HttpMethod';
import ParamHook from './core/ParamHook';
import Request from './core/Request';
import Response from './core/Response';

interface Route {
    key: string,
    method: HttpMethod;
    regex: RegExp;
    pathParams: string[];
    afters: AfterMiddleware[];
    sections: number;
    befores: BeforeMiddleware[];
}

interface Controller {
    klass: new (...args: any[]) => any;
    regex: RegExp;
    pathParams: string[];
    afters: AfterMiddleware[];
    sections: number;
    befores: BeforeMiddleware[];
    routes: Route[];
}

type O<T> = {[key: string]: T};

@injections.Injectable
class Router {
    private controllers: Controller[] = [];
    private afters: AfterMiddleware[] = [];
    private befores: BeforeMiddleware[] = [];
    private contextProviders = new Map<ClassConstructor<any>, (req: Request) => any>();

    @injections.AutoWired
    private routerConfig: RouterConfiguration;

    private findMatched(url: string, method: HttpMethod): { controller: Controller, route: Route, params: Map<string, string>} {
        const params = new Map<string, string>();
        for (const controller of this.controllers) {
            const parentParams = url.split('/').slice(0, controller.sections).join('/').match(controller.regex);
            if (parentParams) {
                for (const route of controller.routes) {
                    if (route.method !== method) {
                        continue;
                    }
                    const routeUrl = '/' + url.split('/').slice(controller.sections, route.sections + controller.sections).join('/');
                    const routeParams = routeUrl.match(route.regex);
                    if (routeParams) {
                        for (let i = 0; i < controller.pathParams.length; i++) {
                            params.set(controller.pathParams[i], parentParams[i + 1]);
                        }
                        for (let i = 0; i < route.pathParams.length; i++) {
                            params.set(route.pathParams[i], routeParams[i + 1]);
                        }
                        return {
                            controller,
                            route,
                            params,
                        };
                    }
                }
            }
        }
        return null;
    }

    routes() {
        return async (context: Koa.Context, next: () => Promise<any>) => {
            const url = context.url;
            const routeStartAt = Date.now();
            let response = new Response();

            const match = this.findMatched(url, HttpMethod[context.method.toUpperCase() as any] as any);
            if (match) {
                const {
                    controller,
                    route,
                    params,
                } = match;
                let request = new Request(context, params);
                const afters = this.afters.concat(controller.afters).concat(route.afters);
                const befores = this.befores.concat(controller.befores).concat(route.befores);

                try {
                    for (const before of befores) {
                        request = await before(request);
                    }

                    const contextProvider = {
                        get: (config: injections.AutoWiredMeta) => {
                            const klass = config.klass;
                            if (klass == Request) {
                                return request;
                            } else {
                                if (this.contextProviders.has(klass)) {
                                    this.contextProviders.get(klass)(request);
                                }
                            }
                            return null;
                        }
                    }

                    const provider = new Provider(request, contextProvider);
                    const controllerInstance = injections.Container.get(controller.klass, provider);
                    response = await controllerInstance[route.key]();

                    for (const after of afters) {
                        response = await after(response);
                    }
                } catch (e) {
                    LogManager.getInstance().getLogger().error(e.stack);
                    response = new Response();
                    response.status = 500;
                    response.body = 'Internal Server Error';
                }
            }

            if (this.routerConfig && this.routerConfig.log) {
                const method = context.method.toLocaleUpperCase();
                const status = response.status;
                const url = context.url;
                const now = process.hrtime();
                const ms = Date.now() - routeStartAt;
                LogManager.getInstance().getLogger().debug(`[${method} ${url}] ${status} ${ms}ms`);
            }
            context.status = response.status;
            context.body = response.body;
            for (const [key, value] of response.headers.entries()) {
                context.headers[key] = value;
            }
            await next();
        }
    }

    private useMiddlewares(befores: BeforeMiddleware[], afters?: AfterMiddleware[]): void {
        this.befores = this.befores.concat(befores);
        this.afters = this.afters.concat(afters || []);
    }

    use(befores: BeforeMiddleware[], afters?: AfterMiddleware[]): void
    use(klass: new (...args: any[]) => any, befores?: BeforeMiddleware[], afters?: AfterMiddleware[]): void
    use(klassOrBefores: BeforeMiddleware[] | (new (...args: any[]) => any), beforeOrAfter?: AfterMiddleware[] | BeforeMiddleware[], afters: AfterMiddleware[] = []): void {
        if (Array.isArray(klassOrBefores)) {
            return this.useMiddlewares(klassOrBefores, <AfterMiddleware[]>beforeOrAfter);
        }

        const klass = klassOrBefores;
        const befores = <BeforeMiddleware[]>beforeOrAfter || [];

        const controllerPath: string = utils.Metadata.get('vader:controller:path', klass) || '';
        const routePaths: O<string> = utils.Metadata.get('vader:route:path', klass.prototype) || {};
        const parentMethod: HttpMethod = utils.Metadata.get('vader:controller:method', klass);
        const routeMethods: O<HttpMethod> = utils.Metadata.get('vader:route:method', klass.prototype) || {};

        const parentAfters: AfterMiddleware[] = utils.Metadata.get('vader:controller:after', klass) || [];
        const routeAfters: O<AfterMiddleware[]> = utils.Metadata.get('vader:route:after', klass.prototype) || {};

        const parentBefores: BeforeMiddleware[] = utils.Metadata.get('vader:controller:before', klass) || [];
        const routeBefores: O<BeforeMiddleware[]> = utils.Metadata.get('vader:route:before', klass.prototype) || {};


        const parentRegex = pathToRegexp(controllerPath);

        const controller: Controller = {
            klass,
            regex: parentRegex,
            routes: [],
            sections: controllerPath.split('/').length,
            pathParams: parentRegex.keys.map(key => <string>key.name),
            afters: parentAfters.concat(afters),
            befores: parentBefores.concat(befores),
        };

        for (const path in routePaths) {
            const regex = pathToRegexp(routePaths[path]);
            const method = routeMethods[path] || parentMethod || HttpMethod.GET;
            const route: Route = {
                key: path,
                regex,
                method,
                sections: routePaths[path].split('/').length,
                pathParams: regex.keys.map(key => <string>key.name),
                afters: routeAfters[path] || [],
                befores: routeBefores[path] || [],
            }
            controller.routes.push(route);
        }

        this.controllers.push(controller);
    }

    provideContext<T>(klass: ClassConstructor<T>, func: (req: Request) => T) {
        this.contextProviders.set(klass, func);
    }
}



export default Router;