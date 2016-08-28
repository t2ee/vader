"use strict";
const Symbol_1 = require('../enums/Symbol');
const ControllerProperty_1 = require('../core/ControllerProperty');
const RouteProperty_1 = require('../core/RouteProperty');
const Debugger = require('debug');
const debug = Debugger('decorator');
const Property = Symbol_1.default.Property;
function Use(func) {
    return (target, key) => {
        if (key) {
            debug(`Mounting @Use(${func}) on method '${key}'`);
            target[Property] = target[Property] || new ControllerProperty_1.default();
            target[Property].routes[key] =
                target[Property].routes[key] ||
                    new RouteProperty_1.default();
            target[Property].routes[key].wares.push(func);
        }
        else {
            debug(`Mounting @Use(${func})`);
            target.prototype[Property] = target.prototype[Property] || new RouteProperty_1.default();
            target.prototype[Property].wares.push(func);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Use;
//# sourceMappingURL=Use.js.map