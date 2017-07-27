"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
const Metadata = require("../utils/Metadata");
function Method(method) {
    return (target, key) => {
        debug(`Mounting @Method(${method})`);
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        property.ROUTES[key].METHOD = method;
        Metadata.set('vader:controller:property', property, target);
    };
}
exports.default = Method;
//# sourceMappingURL=Method.js.map