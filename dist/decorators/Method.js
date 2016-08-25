"use strict";
const Symbol_1 = require('enums/Symbol');
const ControllerProperty_1 = require('core/ControllerProperty');
const RouteProperty_1 = require('core/RouteProperty');
const Debugger = require('debug');
const debug = Debugger('decorator');
const Property = Symbol_1.default.Property;
function Method(method) {
    return (target, key) => {
        debug(`Mounting @Method(${method})`);
        target[Property] = target[Property] || new ControllerProperty_1.default();
        target[Property].routes[key] = target[Property].routes[key] ||
            new RouteProperty_1.default();
        target[Property].routes[key].method = method;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Method;
//# sourceMappingURL=Method.js.map