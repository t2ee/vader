"use strict";
const util_1 = require('./util');
require('reflect-metadata');
const HttpMethod_1 = require('./HttpMethod');
const symbols_1 = require('./symbols');
const AppContext_1 = require('./AppContext');
function Inject(func) {
    return (target, key) => {
        if (key) {
            target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].wares.push(func);
        }
        else {
            target.prototype[symbols_1.Context] = target.prototype[symbols_1.Context] || new AppContext_1.default();
            target.prototype[symbols_1.Context].wares.push(func);
        }
    };
}
exports.Inject = Inject;
function GET(target, key) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
        new AppContext_1.RouteContext();
    target[symbols_1.Context].routes[key].method = HttpMethod_1.default.GET;
}
exports.GET = GET;
function POST(target, key) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
        new AppContext_1.RouteContext();
    target[symbols_1.Context].routes[key].method = HttpMethod_1.default.POST;
}
exports.POST = POST;
function PUT(target, key) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
        new AppContext_1.RouteContext();
    target[symbols_1.Context].routes[key].method = HttpMethod_1.default.PUT;
}
exports.PUT = PUT;
function DELETE(target, key) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
        new AppContext_1.RouteContext();
    target[symbols_1.Context].routes[key].method = HttpMethod_1.default.DELETE;
}
exports.DELETE = DELETE;
function Path(path) {
    return (target, key) => {
        if (key) {
            target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
            target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].paths.push(path);
        }
        else {
            target.prototype[symbols_1.Context] = target.prototype[symbols_1.Context] || new AppContext_1.default();
            target.prototype[symbols_1.Context].path = path;
        }
    };
}
exports.Path = Path;
function Produce(type) {
    return (target, key) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].produce = type;
    };
}
exports.Produce = Produce;
function Consume(type) {
    return (target, key) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].consume = type;
    };
}
exports.Consume = Consume;
function QueryParam(param) {
    return (target, key, index) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        const paramType = symbols_1.ParamType.QueryParam;
        if (index !== undefined) {
            let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].params[index] = {
                type,
                param,
                paramType,
            };
        }
        else {
            let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
            target[symbols_1.Context].params[key] = {
                type,
                param,
                paramType,
            };
        }
    };
}
exports.QueryParam = QueryParam;
function PathParam(param) {
    return (target, key, index) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        const paramType = symbols_1.ParamType.PathParam;
        if (index !== undefined) {
            let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].params[index] = {
                type,
                param,
                paramType,
            };
        }
        else {
            let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
            target[symbols_1.Context].params[key] = {
                type,
                param,
                paramType,
            };
        }
    };
}
exports.PathParam = PathParam;
function BodyParam(param) {
    return (target, key, index) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        const paramType = symbols_1.ParamType.BodyParam;
        if (index !== undefined) {
            let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].params[index] = {
                type,
                param,
                paramType,
            };
        }
        else {
            let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
            target[symbols_1.Context].params[key] = {
                type,
                param,
                paramType,
            };
        }
    };
}
exports.BodyParam = BodyParam;
function HeaderParam(param) {
    return (target, key, index) => {
        target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
        const paramType = symbols_1.ParamType.HeaderParam;
        if (index !== undefined) {
            let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
            target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
                new AppContext_1.RouteContext();
            target[symbols_1.Context].routes[key].params[index] = {
                type,
                param,
                paramType,
            };
        }
        else {
            let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
            target[symbols_1.Context].params[key] = {
                type,
                param,
                paramType,
            };
        }
    };
}
exports.HeaderParam = HeaderParam;
function Query(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.Query;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.Query = Query;
function Params(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.Params;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.Params = Params;
function Body(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.Body;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.Body = Body;
function Headers(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.Headers;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.Headers = Headers;
function AppContext(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.AppContext;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.AppContext = AppContext;
function KoaContext(target, key, index) {
    target[symbols_1.Context] = target[symbols_1.Context] || new AppContext_1.default();
    const paramType = symbols_1.ParamType.KoaContext;
    if (index !== undefined) {
        let type = Reflect.getMetadata(util_1.ReflectType.PARAMETER_TYPE, target, key)[index];
        target[symbols_1.Context].routes[key] = target[symbols_1.Context].routes[key] ||
            new AppContext_1.RouteContext();
        target[symbols_1.Context].routes[key].params[index] = {
            type,
            paramType,
        };
    }
    else {
        let type = Reflect.getMetadata(util_1.ReflectType.TYPE, target, key);
        target[symbols_1.Context].params[key] = {
            type,
            paramType,
        };
    }
}
exports.KoaContext = KoaContext;
//# sourceMappingURL=decorators.js.map