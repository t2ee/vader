"use strict";
const debug_1 = require('../utils/debug');
const ControllerProperty_1 = require('../core/ControllerProperty');
const Property_1 = require('../enums/Property');
const CLASS = Property_1.default.CLASS;
const debug = debug_1.default('vader:decorator');
function Method(method) {
    return (target, key) => {
        debug(`Mounting @Method(${method})`);
        target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
        target[CLASS].ROUTES[key].METHOD = method;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Method;
//# sourceMappingURL=Method.js.map