import * as Koa from 'koa';
import * as pathToRegexp from 'path-to-regexp';
import * as  _ from 'lodash';
const parse: any = require('co-body');
import parseMulti from  '../utils/parseMulti';
import MediaType from  '../enums/MediaType';
import HttpMethod from  '../enums/HttpMethod';
import Symbol from  '../enums/Symbol';
import ControllerProperty from  '../core/ControllerProperty';
import RouteProperty from  '../core/RouteProperty';
import IParameter from  '../core/IParameter';
import ParamType from  '../enums/ParamType';
import IMiddleware from  '../core/IMiddleware';
import VaderContext from  '../core/VaderContext';
import Response from  '../core/Response';

const Property = Symbol.Property;


interface Route {
    controllerClass: new () => any;
    method: string;
    path: Array<string>;
    consume: MediaType;
    produce: MediaType;
    route: string;
    wares: Array<IMiddleware>;
    pathRegex: Array<any>;
    pathKeys: Array<any>;
    params: Array<IParameter>;
}


class Router {
    private _routes: Array<Route> = [];

    private findMatchedRoute(koaContext: Koa.Context) {
        let matchedRoute;
        let params = {};
        for (let route of this._routes) {
            if (route.method.toUpperCase() === koaContext.method.toUpperCase()) {
                for (let i = 0; i < route.pathRegex.length; i++) {
                    let reg = route.pathRegex[i];
                    let ret = reg.exec(koaContext.path);
                    if (ret) {
                        matchedRoute = route;
                        for (let j = 0; j < route.pathKeys[i].length; j++) {
                            params[route.pathKeys[i][j].name] = ret[j + 1];
                        }
                        break;
                    }
                }
            }
        }
        return {
            matchedRoute,
            params,
        };
    }

    private async getBody(route: Route, koaContext: Koa.Context) {
        const contentType: Array<string> = (koaContext.headers['content-type'] || '').split(';');
        if (route.consume === MediaType.JSON &&
            contentType.indexOf(
                MediaType.toString(MediaType.JSON)
            ) !== -1) {
            return await new Promise<any>((resolve, reject) => {
                parse.json(koaContext).then(resolve).catch(reject);
            });
        } else if (route.consume === MediaType.FORM &&
            contentType.indexOf(MediaType.toString(MediaType.FORM)) !== -1) {
            return await new Promise<any>((resolve, reject) => {
                parse.form(koaContext).then(resolve).catch(reject);
            });
        } else if (route.consume === MediaType.TEXT) {
            return await new Promise<any>((resolve, reject) => {
                parse.text(koaContext).then(resolve).catch(reject);
            });
        } else if (route.consume === MediaType.MULTIPART &&
            contentType.indexOf(MediaType.toString(MediaType.MULTIPART)) !== -1) {
            let result = await parseMulti(koaContext);
            let body = {};
            for (let key in result.fields) {
                body[key] = result.fields[key];
            }
            for (let key in result.files) {
                body[key] = result.files[key];
            }
            return body;
        }
        return null;
    }

    getParameterValue(parameter: IParameter, context: VaderContext) {
        switch (parameter.paramType) {
            case ParamType.QueryParam:
                if (parameter.paramKey) {
                    return _.get(context.query, parameter.paramKey)
                } else {
                    return context.query
                }
            case ParamType.PathParam:
                if (parameter.paramKey) {
                    return _.get(context.params, parameter.paramKey);
                } else {
                    return context.params;
                }
            case ParamType.BodyParam:
                if (parameter.paramKey) {
                    return _.get(context.body, parameter.paramKey);
                } else {
                    return context.body;
                }
            case ParamType.HeaderParam:
                if (parameter.paramKey) {
                    return _.get(context.headers, parameter.paramKey);
                } else {
                    return context.headers;
                }
            case ParamType.Context:
                return context;
        }
    }

    getParameter(parameter: IParameter, context: VaderContext) {
        let ret = this.getParameterValue(parameter, context);
        if (!ret) return null;
        if ([Object, String, Date, Number, Boolean].indexOf(parameter.type) !== -1)     {
            return ret;
        }
        return ret;
    }

    routes() {
        return async (koaContext: Koa.Context, next: () => Promise<any>):Promise<void> => {
            const self = this;
            const {
                matchedRoute,
                params,
            } = this.findMatchedRoute(koaContext);

            if (matchedRoute) {
                const context = new VaderContext();
                context.params = params;
                context.headers = koaContext.headers;
                context.query = koaContext.query;
                context.body =  await this.getBody(matchedRoute, koaContext);

                await run(_next(context), context);
                await next();

                async function run(next, context) {
                    for (const ware of matchedRoute.wares) {
                        next = ((next, ware) => async () =>
                            await ware(context, next))(next, ware);
                    }
                    const controllerClass = matchedRoute.controllerClass;
                    for (const ware of controllerClass.prototype[Property].wares) {
                        next = ((next, ware) => async () =>
                            await ware(context, next))(next, ware);
                    }
                    await next();
                }

                function _next(context) {
                    return async () => {
                    let parameters = [];
                    const controllerClass = matchedRoute.controllerClass;


                    for (const parameter of matchedRoute.params) {
                        parameters.push(self.getParameter(parameter, context));
                    }

                    for (const key in controllerClass.prototype[Property].params) {
                        controllerClass.prototype[key] =
                            self.getParameter(
                                controllerClass.prototype[Property].params[key],
                                context);
                    }

                    let router = new controllerClass();
                    const response = await router[matchedRoute.route](...parameters);
                    response.send(koaContext);
                };
            }
        }

        };
    }

    use<T>(controllerClass: new (...args) => T) {
        const controller = controllerClass.prototype;
        const property: ControllerProperty = controller[Property];
        for (const key in property.routes) {
            const pathRegex = [];
            const pathKeys = [];
            const route = property.routes[key];
            for (const path of route.paths) {
                const keys: pathToRegexp.Key[] = [];
                const regex = pathToRegexp(property.path + path, keys);
                pathRegex.push(regex);
                pathKeys.push(keys);
            }

            this._routes.push({
                controllerClass,
                method: route.method,
                path: route.paths.map(p => property.path + p),
                consume: route.consume,
                produce: route.produce,
                route: key,
                wares: route.wares,
                pathRegex,
                pathKeys,
                params: route.params,
            });
        }
    }
}

export default Router;
