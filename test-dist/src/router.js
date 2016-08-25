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
const util_1 = require('./util');
const Response_1 = require('./Response');
const symbols_1 = require('./symbols');
const HttpMethod_1 = require('./HttpMethod');
class Router {
    constructor() {
        this.routerRoutes = [];
    }
    routes() {
        return (context, next) => __awaiter(this, void 0, void 0, function* () {
            let matchedRoute;
            let params = {};
            //  Find match routes
            for (let route of this.routerRoutes) {
                if (HttpMethod_1.HttpMethodToString(route.method) === context.method) {
                    for (let i = 0; i < route.pathRegex.length; i++) {
                        let reg = route.pathRegex[i];
                        let ret = reg.exec(context.path);
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
            if (matchedRoute) {
                let parameters = [];
                let body = {};
                yield run(_next);
                yield next();
                function run(next) {
                    return __awaiter(this, void 0, void 0, function* () {
                        {
                            let i = matchedRoute.wares.length;
                            while (i--) {
                                next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () {
                                    return yield ware(context, next);
                                }))(next, matchedRoute.wares[i]);
                            }
                        }
                        const klass = matchedRoute.routerClass;
                        {
                            let i = klass.prototype[symbols_1.Context].wares.length;
                            while (i--) {
                                next = ((next, ware) => () => __awaiter(this, void 0, void 0, function* () {
                                    return yield ware(context, next);
                                }))(next, klass.prototype[symbols_1.Context].wares[i]);
                            }
                        }
                        yield next();
                    });
                }
                function _next() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contentType = (context.headers['content-type'] || '').split(';');
                        const klass = matchedRoute.routerClass;
                        //parse body
                        if (matchedRoute.consume === util_1.MediaType.JSON &&
                            contentType.indexOf(util_1.mediaTypeToString(util_1.MediaType.JSON)) !== -1) {
                            body = yield new Promise((resolve, reject) => {
                                parse.json(context).then(resolve).catch(reject);
                            });
                        }
                        else if (matchedRoute.consume === util_1.MediaType.FORM &&
                            contentType.indexOf(util_1.mediaTypeToString(util_1.MediaType.FORM)) !== -1) {
                            body = yield new Promise((resolve, reject) => {
                                parse.form(context).then(resolve).catch(reject);
                            });
                        }
                        else if (matchedRoute.consume === util_1.MediaType.TEXT &&
                            contentType.indexOf(util_1.mediaTypeToString(util_1.MediaType.TEXT)) !== -1) {
                            body = yield new Promise((resolve, reject) => {
                                parse.text(context).then(resolve).catch(reject);
                            });
                        }
                        else if (matchedRoute.consume === util_1.MediaType.MULTIPART &&
                            contentType.indexOf(util_1.mediaTypeToString(util_1.MediaType.MULTIPART)) !== -1) {
                            let result = yield util_1.parseMulti(context);
                            body = {};
                            for (let key in result.fields) {
                                body[key] = result.fields[key];
                            }
                            for (let key in result.files) {
                                body[key] = result.files[key];
                            }
                        }
                        let response;
                        function getParameter(parameter) {
                            let ret;
                            switch (parameter.paramType) {
                                case symbols_1.ParamType.QueryParam:
                                    ret = _.get(context.query, parameter.key);
                                    break;
                                case symbols_1.ParamType.PathParam:
                                    ret = _.get(params, parameter.key);
                                    break;
                                case symbols_1.ParamType.BodyParam:
                                    ret = _.get(body, parameter.key);
                                    break;
                                case symbols_1.ParamType.HeaderParam:
                                    ret = _.get(context.headers, parameter.key);
                                    break;
                                case symbols_1.ParamType.Query:
                                    ret = context.query;
                                    break;
                                case symbols_1.ParamType.Params:
                                    ret = params;
                                    break;
                                case symbols_1.ParamType.Body:
                                    ret = body;
                                    break;
                                case symbols_1.ParamType.Headers:
                                    ret = context.headers;
                                    break;
                                case symbols_1.ParamType.KoaContext:
                                    ret = context;
                                    break;
                            }
                            if ([Object, String, Date, Number, Boolean].indexOf(parameter.type) !== -1) {
                                return parameter.type(ret);
                            }
                            else if ([Response_1.default].indexOf(parameter.type) !== -1) {
                                return ret;
                            }
                            else {
                                return new parameter.type(ret);
                            }
                        }
                        for (const parameter of matchedRoute.params) {
                            parameters.push(getParameter(parameter));
                        }
                        for (const key in klass.prototype[symbols_1.Context].params) {
                            klass.prototype[key] = getParameter(klass.prototype[symbols_1.Context].params[key]);
                        }
                        let router = new klass();
                        response = yield router[matchedRoute.route](...parameters);
                        switch (matchedRoute.produce) {
                            case util_1.MediaType.JSON:
                                response.body = JSON.stringify(response.body);
                                response.headers['Content-Type'] = util_1.mediaTypeToString(matchedRoute.produce);
                                break;
                        }
                        response.send(context);
                    });
                }
                ;
            }
        });
    }
    use(routerClass) {
        const router = routerClass.prototype;
        const context = router[symbols_1.Context];
        const pathRegex = [];
        const pathKeys = [];
        for (const key in context.routes) {
            const route = context.routes[key];
            for (const path of route.paths) {
                const keys = [];
                const regex = pathToRegexp(context.path + path, keys);
                pathRegex.push(regex);
                pathKeys.push(keys);
            }
            this.routerRoutes.push({
                routerClass,
                method: route.method,
                path: route.paths.map(p => context.path + p),
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