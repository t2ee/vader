"use strict";
const Symbol_1 = require('../enums/Symbol');
const ControllerProperty_1 = require('../core/ControllerProperty');
const RouteProperty_1 = require('../core/RouteProperty');
const Debugger = require('debug');
const debug = Debugger('decorator');
const Property = Symbol_1.default.Property;
function Path(path) {
    return (target, key) => {
        if (key) {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            target[Property] = target[Property] || new ControllerProperty_1.default();
            target[Property] = target[Property] || new ControllerProperty_1.default();
            target[Property].routes[key] = target[Property].routes[key] ||
                new RouteProperty_1.default();
            target[Property].routes[key].paths.push(path);
        }
        else {
            debug(`Mounting @Path('${path}')`);
            target.prototype[Property] = target.prototype[Property] || new ControllerProperty_1.default();
            target.prototype[Property].path = path;
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Path;
//# sourceMappingURL=Path.js.map