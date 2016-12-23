"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
require("reflect-metadata");
function Use(func) {
    return (target, key) => {
        if (key) {
            const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
            debug(`Mounting @Use(${func}) on method '${key}'`);
            property.ROUTES[key].WARES.push(func);
            Reflect.defineMetadata('vader:controller:property', property, target);
        }
        else {
            debug(`Mounting @Use(${func})`);
            const property = Reflect.getMetadata('vader:controller:property', target.prototype) || new ControllerProperty_1.default();
            property.WARES.push(func);
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Use;
//# sourceMappingURL=Use.js.map