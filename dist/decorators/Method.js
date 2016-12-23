"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
function Method(method) {
    return (target, key) => {
        debug(`Mounting @Method(${method})`);
        const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
        property.ROUTES[key].METHOD = method;
        Reflect.defineMetadata('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Method;
//# sourceMappingURL=Method.js.map