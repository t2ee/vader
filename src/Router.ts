import * as pathToRegexp from 'path-to-regexp';
import * as Koa from 'koa';
import {
    AutoWired,
    Component,
    ClassConstructor,
    Metadata,
    Container,
} from '@t2ee/core';
import {
    LogManager,
    Logger,
} from '@t2ee/sl4js';
import RouterConfiguration from './RouterConfiguration';

import AfterMiddleware from './core/AfterMiddleware';
import BeforeMiddleware from './core/BeforeMiddleware';
import AfterAllMiddleware from './core/AfterAllMiddleware';
import HttpMethod from './enums/HttpMethod';
import Request from './core/Request';
import Response from './core/Response';
import ErrorHandler from './handlers/ErrorHandler';
import NotFoundHandler from './handlers/NotFoundHandler';

interface Route {
    key: string;
    method: HttpMethod;
    regex: RegExp;
    pathParams: string[];
    afters: AfterMiddleware[];
    befores: BeforeMiddleware[];
    afterAlls: AfterAllMiddleware[];
    sections: number;
}

interface Controller {
    klass: new (...args: any[]) => any;
    regex: RegExp;
    pathParams: string[];
    afters: AfterMiddleware[];
    befores: BeforeMiddleware[];
    afterAlls: AfterAllMiddleware[];
    sections: number;
    routes: Route[];
}

interface MatchResult {
    controller: Controller;
    route: Route;
    params: Map<string, string>;
}

type O<T> = {[key: string]: T};

@Component
class Router {
    private controllers: Controller[] = [];
    private afters: AfterMiddleware[] = [];
    private befores: BeforeMiddleware[] = [];
    private afterAlls: AfterAllMiddleware[] = [];
    private contextedVariables: Map<ClassConstructor<any>, (req: Request) => any> =
        new Map<ClassConstructor<any>, (req: Request) => any>();

    public constructor() {
        this.provideContext(Request, (req: Request) => req);
        this.provideContext(Request, (req: Request) => req);
    }

    @AutoWired('ErrorHandler')
    private errorHandler: ErrorHandler;

    @AutoWired('NotFoundHandler')
    private notFoundHandler: NotFoundHandler;

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

    private shouldErrorHandlerHandleError(error: Error): boolean {
        if (!this.errorHandler) return false;
        if (!this.errorHandler.supportedErrors) return true;
        const errors = this.errorHandler.supportedErrors();
        if (errors.filter(e => error instanceof e).length) {
            return true;
        }
        return false;
    }

    public routes(): (context: Koa.Context, next: () => Promise<any>) => any {
        return async (context: Koa.Context, next: () => Promise<any>): Promise<any> => {
            const url: string = context.path;
            const routeStartAt: number = Date.now();
            const response: Response = new Response();

            const match: MatchResult = this.findMatched(url, HttpMethod[context.method.toUpperCase() as any] as any);
            const request: Request = new Request(context, new Map<string, string>());
            const volatileMap: {
                request: Request,
                response: Response,
            } = {
                request,
                response,
            };

            let afterAlls: (AfterAllMiddleware | string)[] = [];
            let controllerInstance: any;

            if (match) {
                const {
                    controller,
                    route,
                    params,
                }: MatchResult = match;
                const afters: (AfterMiddleware | string)[] =
                    this.afters.concat(controller.afters).concat(route.afters);
                const befores: (BeforeMiddleware | string)[] =
                    this.befores.concat(controller.befores).concat(route.befores);
                afterAlls = this.afterAlls.concat(controller.afterAlls).concat(route.afterAlls);

                volatileMap.request = new Request(context, params);

                try {

                    controllerInstance =
                        Container.get<any>({
                            type: controller.klass,
                            declaredType: null,
                        },
                        null,
                        {
                                volatile: volatileMap,
                                context: this.contextedVariables,
                        });

                    for (const before of befores) {
                        if (typeof before === 'string') {
                            volatileMap.request = await controllerInstance[before](volatileMap.request);
                        } else {
                            volatileMap.request = await before(volatileMap.request);
                        }
                    }

                    volatileMap.response = await controllerInstance[route.key]();

                    if (!volatileMap.response && this.notFoundHandler) {
                        volatileMap.response = await this.notFoundHandler.handle(volatileMap.request, void 0);
                    }

                    volatileMap.response = volatileMap.response || new Response();
                    volatileMap.response.extra = volatileMap.request.extra;

                    for (const after of afters) {
                        if (typeof after === 'string') {
                            volatileMap.response = await controllerInstance[after](volatileMap.response);
                        } else {
                            volatileMap.response = await after(volatileMap.response);
                        }
                    }

                } catch (e) {
                    if (this.shouldErrorHandlerHandleError(e)) {
                        volatileMap.response = await this.errorHandler.handle(volatileMap.request, e);
                    } else {
                        LogManager.getLogger().error(e.stack);
                        volatileMap.response = new Response();
                        // tslint:disable-next-line no-magic-numbers
                        volatileMap.response.body = 'Internal Server Error';
                        volatileMap.response.status = 500;
                    }
                }
            } else if (this.notFoundHandler) {
                const handlerResponse: Response = await this.notFoundHandler.handle(volatileMap.request, void 0);
                volatileMap.response = handlerResponse || volatileMap.response;
            }

            if (this.routerConfig && this.routerConfig.logEnabled) {
                const method: string = context.method.toLocaleUpperCase();
                const status: number = volatileMap.response.status;
                const ms: number = Date.now() - routeStartAt;
                LogManager.getLogger().trace(`[${method} ${url}] ${status} ${ms}ms`);
            }
            context.status = volatileMap.response.status;
            context.body = volatileMap.response.body;
            for (const [key, value] of volatileMap.response.headers.entries()) {
                context.set(key, value);
            }
            await next();
            (async () => {
                for (const afterAll of afterAlls) {
                    if (typeof afterAll === 'string') {
                        await controllerInstance[afterAll](volatileMap.request, volatileMap.response);
                    } else {
                        await afterAll(volatileMap.request, volatileMap.response);
                    }
                }
            })()
            .catch((e: Error) => {
                if (this.shouldErrorHandlerHandleError(e)) {
                    this.errorHandler.handle(volatileMap.request, e).catch((e: Error) => {
                        LogManager.getLogger().error(e.stack);
                    });
                } else {
                    LogManager.getLogger().error(e.stack);
                }
            });
        };
    }

    private useMiddlewares(
        befores: BeforeMiddleware[],
        afters?: AfterMiddleware[],
        afterAlls?: AfterAllMiddleware[]
    ): void {
        this.befores = this.befores.concat(befores);
        this.afters = this.afters.concat(afters || []);
        this.afterAlls = this.afterAlls.concat(afterAlls || []);
    }

    // tslint:disable-next-line prefer-function-over-method
    public use(befores: BeforeMiddleware[], afters?: AfterMiddleware[], afterAlls?: AfterAllMiddleware[]): void;
    // tslint:disable-next-line prefer-function-over-method
    public use(
        klass: ClassConstructor<any>,
        befores?: BeforeMiddleware[],
        afters?: AfterMiddleware[],
        afterAlls?: AfterAllMiddleware[],
    ): void;
    public use(
        klassOrBefores: BeforeMiddleware[] | ClassConstructor<any>,
        beforeOrAfter?: AfterMiddleware[] | BeforeMiddleware[],
        aftersOrAfterAlls?: AfterMiddleware[] | AfterAllMiddleware[],
        afterAlls: AfterAllMiddleware[] = [],
    ): Router {
        if (Array.isArray(klassOrBefores)) {
            this.useMiddlewares(klassOrBefores, <AfterMiddleware[]> beforeOrAfter);

            return;
        }

        const logger: Logger = LogManager.getLogger();

        const klass: ClassConstructor<any>  = klassOrBefores;
        const befores: BeforeMiddleware[] = <BeforeMiddleware[]> beforeOrAfter || [];
        const afters: AfterMiddleware[] = <AfterMiddleware[]> aftersOrAfterAlls || [];

        Component(klass);

        const controllerPath: string = Metadata.get('t2ee:vader:controller:path', klass) || '';
        const routePaths: O<string> = Metadata.get('t2ee:vader:route:path', klass.prototype) || {};
        const parentMethod: HttpMethod = Metadata.get('t2ee:vader:controller:method', klass);
        const routeMethods: O<HttpMethod> = Metadata.get('t2ee:vader:route:method', klass.prototype) || {};

        const parentAfters: AfterMiddleware[] = Metadata.get('t2ee:vader:controller:after', klass) || [];
        const routeAfters: O<AfterMiddleware[]> = Metadata.get('t2ee:vader:route:after', klass.prototype) || {};

        const parentBefores: BeforeMiddleware[] = Metadata.get('t2ee:vader:controller:before', klass) || [];
        const routeBefores: O<BeforeMiddleware[]> = Metadata.get('t2ee:vader:route:before', klass.prototype) || {};

        const parentAfterAlls: AfterAllMiddleware[] = Metadata.get('t2ee:vader:controller:afterall', klass) || [];
        const routeAfterAlls: O<AfterAllMiddleware[]> =
            Metadata.get('t2ee:vader:route:afterall', klass.prototype) || [];

        const parentRegex: pathToRegexp.PathRegExp = pathToRegexp(controllerPath);

        const controller: Controller = {
            klass,
            regex: parentRegex,
            routes: [],
            sections: controllerPath.split('/').length,
            pathParams: parentRegex.keys.map((key: pathToRegexp.Key) => <string> key.name),
            afters: parentAfters.concat(afters),
            befores: parentBefores.concat(befores),
            afterAlls: parentAfterAlls.concat(afterAlls),
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
                afterAlls: routeAfterAlls[path] || [],
            };
            logger.info(`Registered Route at Path: ${controllerPath}${routePaths[path]}`);
            controller.routes.push(route);
        }

        this.controllers.push(controller);

        return this;
    }

    public static newInstance(): Router {
        const router: Router = Container.get(Router);

        return router;
    }

    public provideContext<T>(klass: ClassConstructor<T>, func: (req: Request) => T): Router{
        this.contextedVariables.set(klass, func);
        return this;
    }

}

export default Router;
