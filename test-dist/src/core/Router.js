"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const pathToRegexp = require('path-to-regexp');
const _ = require('lodash');
const parse = require('co-body');
const parseMulti_1 = require('../utils/parseMulti');
const MediaType_1 = require('../enums/MediaType');
const Symbol_1 = require('../enums/Symbol');
const ParamType_1 = require('../enums/ParamType');
const VaderContext_1 = require('../core/VaderContext');
const Property = Symbol_1.default.Property;
class Router {
    constructor() {
        this._routes = [];
    }
    findMatchedRoute(koaContext) {
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
    getBody(route, koaContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = (koaContext.headers['content-type'] || '').split(';');
            if (route.consume === MediaType_1.default.JSON &&
                contentType.indexOf(MediaType_1.default.toString(MediaType_1.default.JSON)) !== -1) {
                return yield new Promise((resolve, reject) => {
                    parse.json(koaContext).then(resolve).catch(reject);
                });
            }
            else if (route.consume === MediaType_1.default.FORM &&
                contentType.indexOf(MediaType_1.default.toString(MediaType_1.default.FORM)) !== -1) {
                return yield new Promise((resolve, reject) => {
                    parse.form(koaContext).then(resolve).catch(reject);
                });
            }
            else if (route.consume === MediaType_1.default.TEXT) {
                return yield new Promise((resolve, reject) => {
                    parse.text(koaContext).then(resolve).catch(reject);
                });
            }
            else if (route.consume === MediaType_1.default.MULTIPART &&
                contentType.indexOf(MediaType_1.default.toString(MediaType_1.default.MULTIPART)) !== -1) {
                let result = yield parseMulti_1.default(koaContext);
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
        });
    }
    getParameterValue(parameter, context) {
        switch (parameter.paramType) {
            case ParamType_1.default.QueryParam:
                if (parameter.paramKey) {
                    return _.get(context.query, parameter.paramKey);
                }
                else {
                    return context.query;
                }
            case ParamType_1.default.PathParam:
                if (parameter.paramKey) {
                    return _.get(context.params, parameter.paramKey);
                }
                else {
                    return context.params;
                }
            case ParamType_1.default.BodyParam:
                if (parameter.paramKey) {
                    return _.get(context.body, parameter.paramKey);
                }
                else {
                    return context.body;
                }
            case ParamType_1.default.HeaderParam:
                if (parameter.paramKey) {
                    return _.get(context.headers, parameter.paramKey);
                }
                else {
                    return context.headers;
                }
            case ParamType_1.default.Context:
                return context;
        }
    }
    getParameter(parameter, context) {
        let ret = this.getParameterValue(parameter, context);
        if (!ret)
            return null;
        if ([Object, String, Date, Number, Boolean].indexOf(parameter.type) !== -1) {
            return ret;
        }
        return ret;
    }
    routes() {
        return (koaContext, next) => __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const { matchedRoute, params, } = this.findMatchedRoute(koaContext);
            if (matchedRoute) {
                const context = new VaderContext_1.default();
                context.params = params;
                context.headers = koaContext.headers;
                context.query = koaContext.query;
                context.body = yield this.getBody(matchedRoute, koaContext);
                yield run(_next(context), context);
                yield next();
                function run(next, context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const ware of matchedRoute.wares) {
                            next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () {
                                return yield ware(context, next);
                            }))(next, ware);
                        }
                        const controllerClass = matchedRoute.controllerClass;
                        for (const ware of controllerClass.prototype[Property].wares) {
                            next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () {
                                return yield ware(context, next);
                            }))(next, ware);
                        }
                        yield next();
                    });
                }
                function _next(context) {
                    return () => __awaiter(this, void 0, void 0, function* () {
                        let parameters = [];
                        const controllerClass = matchedRoute.controllerClass;
                        for (const parameter of matchedRoute.params) {
                            parameters.push(self.getParameter(parameter, context));
                        }
                        for (const key in controllerClass.prototype[Property].params) {
                            controllerClass.prototype[key] =
                                self.getParameter(controllerClass.prototype[Property].params[key], context);
                        }
                        let router = new controllerClass();
                        const response = yield router[matchedRoute.route](...parameters);
                        response.send(koaContext);
                    });
                }
            }
        });
    }
    use(controllerClass) {
        const controller = controllerClass.prototype;
        const property = controller[Property];
        for (const key in property.routes) {
            const pathRegex = [];
            const pathKeys = [];
            const route = property.routes[key];
            for (const path of route.paths) {
                const keys = [];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;
//# sourceMappingURL=Router.js.map