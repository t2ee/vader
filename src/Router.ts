import * as pathToRegexp from 'path-to-regexp';
import * as Koa from 'koa';
import {
    AutoWired,
    Injectable,
    Provider,
    ClassConstructor,
    AutoWiredMeta,
    Metadata,
    Container,
} from '@t2ee/core';
import {
    LogManager,
} from 'sl4js';
import RouterConfiguration from './RouterConfiguration';
import CustomHandler from './core/CustomHandler';

import AfterMiddleware from './core/AfterMiddleware';
import BeforeMiddleware from './core/BeforeMiddleware';
import RouteProvider from './RouteProvider';
import HttpMethod from './enums/HttpMethod';
import Request from './core/Request';
import Response from './core/Response';

interface Route {
    key: string;
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

interface MatchResult {
    controller: Controller;
    route: Route;
    params: Map<string, string>;
}

type O<T> = {[key: string]: T};

@Injectable
class Router {
    private controllers: Controller[] = [];
    private afters: AfterMiddleware[] = [];
    private befores: BeforeMiddleware[] = [];
    private contextProviders: Map<ClassConstructor<any>, (req: Request) => any> =
        new Map<ClassConstructor<any>, (req: Request) => any>();
    private _customHandler: ClassConstructor<CustomHandler>;

    @AutoWired
    private routerConfig: RouterConfiguration;

    private findMatched(
        url: string,
        method: HttpMethod,
    ): MatchResult {
        const params: Map<string, string> = new Map<string, string>();
        for (const controller of this.controllers) {
            const parentParams: RegExpMatchArray =
                url.split('/').slice(0, controller.sections).join('/').match(controller.regex);
            if (parentParams) {
                for (const route of controller.routes) {
                    if (route.method !== method) {
                        continue;
                    }
                    const routeUrl: string = '/' +
                        url.split('/').slice(controller.sections, route.sections + controller.sections).join('/');
                    const routeParams: RegExpMatchArray = routeUrl.match(route.regex);
                    if (routeParams) {
                        for (let i: number = 0; i < controller.pathParams.length; i++) {
                            params.set(controller.pathParams[i], parentParams[i + 1]);
                        }
                        for (let i: number = 0; i < route.pathParams.length; i++) {
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

    public routes(): (context: Koa.Context, next: () => Promise<any>) => any {
        return async (context: Koa.Context, next: () => Promise<any>): Promise<any> => {
            const url: string = context.path;
            const routeStartAt: number = Date.now();
            let response: Response = new Response();

            const match: MatchResult = this.findMatched(url, HttpMethod[context.method.toUpperCase() as any] as any);
            if (match) {
                const {
                    controller,
                    route,
                    params,
                }: MatchResult = match;
                let request: Request = new Request(context, params);
                const afters: AfterMiddleware[] = this.afters.concat(controller.afters).concat(route.afters);
                const befores: BeforeMiddleware[] = this.befores.concat(controller.befores).concat(route.befores);


                const contextProvider: Provider = {
                    get: (config: AutoWiredMeta): any => {
                        const klass: ClassConstructor<any> = config.klass;
                        if (klass === Request) {
                            return request;
                        } else {
                            if (this.contextProviders.has(klass)) {
                                return this.contextProviders.get(klass)(request);
                            }
                        }

                        return null;
                    },
                };

                const provider: Provider = new RouteProvider(request, contextProvider);
                let customHandler: CustomHandler;
                if (this._customHandler) {
                    customHandler = Container.get<CustomHandler>(this._customHandler, provider);
                }

                try {
                    for (const before of befores) {
                        request = await before(request);
                    }

                    const controllerInstance: any =
                        Container.get<any>(controller.klass, provider);
                    response = await controllerInstance[route.key]();
                    response = response || new Response();
                    response.extra = request.extra;

                    for (const after of afters) {
                        response = await after(response);
                    }

                } catch (e) {
                    if (customHandler) {
                        //response = this._exceptionCaughtHandler(e);
                        response = customHandler.exceptionCaught(e);
                    } else {
                        LogManager.getInstance().getLogger().error(e.stack);
                        response = new Response();
                        // tslint:disable-next-line no-magic-numbers
                        response.status = 500;
                        response.body = 'Internal Server Error';
                    }
                }
            }

            if (this.routerConfig && this.routerConfig.log) {
                const method: string = context.method.toLocaleUpperCase();
                const status: number = response.status;
                const ms: number = Date.now() - routeStartAt;
                LogManager.getInstance().getLogger().trace(`[${method} ${url}] ${status} ${ms}ms`);
            }
            context.status = response.status;
            context.body = response.body;
            for (const [key, value] of response.headers.entries()) {
                context.set(key, value);
            }
            await next();
        };
    }

    private useMiddlewares(befores: BeforeMiddleware[], afters?: AfterMiddleware[]): void {
        this.befores = this.befores.concat(befores);
        this.afters = this.afters.concat(afters || []);
    }

    // tslint:disable-next-line prefer-function-over-method
    public use(befores: BeforeMiddleware[], afters?: AfterMiddleware[]): void;
    // tslint:disable-next-line prefer-function-over-method
    public use(klass: ClassConstructor<any>, befores?: BeforeMiddleware[], afters?: AfterMiddleware[]): void;
    public use(
        klassOrBefores: BeforeMiddleware[] | ClassConstructor<any>,
        beforeOrAfter?: AfterMiddleware[] | BeforeMiddleware[],
        afters: AfterMiddleware[] = [],
    ): void {
        if (Array.isArray(klassOrBefores)) {
            this.useMiddlewares(klassOrBefores, <AfterMiddleware[]> beforeOrAfter);

            return;
        }

        const klass: ClassConstructor<any>  = klassOrBefores;
        const befores: BeforeMiddleware[] = <BeforeMiddleware[]> beforeOrAfter || [];

        const controllerPath: string = Metadata.get('vader:controller:path', klass) || '';
        const routePaths: O<string> = Metadata.get('vader:route:path', klass.prototype) || {};
        const parentMethod: HttpMethod = Metadata.get('vader:controller:method', klass);
        const routeMethods: O<HttpMethod> = Metadata.get('vader:route:method', klass.prototype) || {};

        const parentAfters: AfterMiddleware[] = Metadata.get('vader:controller:after', klass) || [];
        const routeAfters: O<AfterMiddleware[]> = Metadata.get('vader:route:after', klass.prototype) || {};

        const parentBefores: BeforeMiddleware[] = Metadata.get('vader:controller:before', klass) || [];
        const routeBefores: O<BeforeMiddleware[]> = Metadata.get('vader:route:before', klass.prototype) || {};


        const parentRegex: pathToRegexp.PathRegExp = pathToRegexp(controllerPath);

        const controller: Controller = {
            klass,
            regex: parentRegex,
            routes: [],
            sections: controllerPath.split('/').length,
            pathParams: parentRegex.keys.map((key: pathToRegexp.Key) => <string> key.name),
            afters: parentAfters.concat(afters),
            befores: parentBefores.concat(befores),
        };

        for (const path in routePaths) {
            const regex: pathToRegexp.PathRegExp = pathToRegexp(routePaths[path]);
            const method: HttpMethod = routeMethods[path] || parentMethod || HttpMethod.GET;
            const route: Route = {
                key: path,
                regex,
                method,
                sections: routePaths[path].split('/').length,
                pathParams: regex.keys.map((key: pathToRegexp.Key) => <string> key.name),
                afters: routeAfters[path] || [],
                befores: routeBefores[path] || [],
            };
            controller.routes.push(route);
        }

        this.controllers.push(controller);
    }

    public provideContext<T>(klass: ClassConstructor<T>, func: (req: Request) => T): void {
        this.contextProviders.set(klass, func);
    }

    public set customHandler(handler: ClassConstructor<CustomHandler>) {
        this._customHandler = handler;
    }
}

export default Router;
