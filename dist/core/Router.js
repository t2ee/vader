"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegexp = require("path-to-regexp");
const _ = require("lodash");
const parse = require('co-body');
const parseMulti_1 = require("../utils/parseMulti");
const MediaType_1 = require("../enums/MediaType");
const ParamType_1 = require("../enums/ParamType");
const VaderContext_1 = require("../core/VaderContext");
const Metadata = require("../utils/Metadata");
class Router {
    constructor() {
        this._routes = [];
        this._providers = {};
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
                return body;
            }
            return null;
        });
    }
    getParameterValue(parameter, context) {
        return __awaiter(this, void 0, void 0, function* () {
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
                default:
                    if (this._providers[parameter.paramType]) {
                        return yield this._providers[parameter.paramType](parameter, context);
                    }
            }
        });
    }
    getParameter(parameter, context) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.getParameterValue(parameter, context);
            if (!ret)
                return null;
            return ret;
        });
    }
    setErrorHandler(handler) {
        this._errorHandler = handler;
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
                context.http = koaContext;
                try {
                    yield run(_next(context), context);
                }
                catch (e) {
                    if (this._errorHandler) {
                        (yield this._errorHandler(e)).send(koaContext);
                    }
                    else {
                        console.error(e.stack || e);
                        koaContext.body = 'Internal Server Error';
                        koaContext.status = 500;
                    }
                }
                yield next();
                function run(next, context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const ware of matchedRoute.wares) {
                            next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () { return yield ware(context, next); }))(next, ware);
                        }
                        const controllerClass = matchedRoute.controllerClass;
                        const property = Metadata.get('vader:controller:property', controllerClass.prototype);
                        for (const ware of property.WARES) {
                            next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () { return yield ware(context, next); }))(next, ware);
                        }
                        yield next();
                    });
                }
                function _next(context) {
                    return () => __awaiter(this, void 0, void 0, function* () {
                        let parameters = [];
                        const controllerClass = matchedRoute.controllerClass;
                        const property = Metadata.get('vader:controller:property', controllerClass.prototype);
                        for (const param of matchedRoute.params) {
                            parameters.push(yield self.getParameter(param, context));
                        }
                        for (const param of property.PARAMS) {
                            controllerClass.prototype[param.key] =
                                yield self.getParameter(param, context);
                        }
                        let router = new controllerClass();
                        const response = yield router[matchedRoute.route](...parameters);
                        response.send(koaContext);
                    });
                }
            }
        });
    }
    provide(name, fn) {
        this._providers[name] = fn;
    }
    use(controllerClass) {
        const controller = controllerClass.prototype;
        const property = Metadata.get('vader:controller:property', controller);
        for (const key in property.ROUTES) {
            const pathRegex = [];
            const pathKeys = [];
            const route = property.ROUTES[key];
            for (const path of route.PATHS) {
                const keys = [];
                const regex = pathToRegexp(property.PATH + path, keys);
                pathRegex.push(regex);
                pathKeys.push(keys);
            }
            this._routes.push({
                controllerClass,
                method: route.METHOD,
                path: route.PATHS.map((p) => property.PATH + p),
                consume: route.CONSUME,
                produce: route.PRODUCE,
                route: key,
                wares: route.WARES,
                pathRegex,
                pathKeys,
                params: route.PARAMS,
            });
        }
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map