"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const Property_1 = require("../enums/Property");
const CLASS = Property_1.default.CLASS;
const debug = debug_1.default('vader:decorator');
function Use(func) {
    return (target, key) => {
        if (key) {
            debug(`Mounting @Use(${func}) on method '${key}'`);
            target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
            target[CLASS].ROUTES[key].WARES.push(func);
        }
        else {
            debug(`Mounting @Use(${func})`);
            target.prototype[CLASS] = target.prototype[CLASS] || new ControllerProperty_1.default();
            target.prototype[CLASS].WARES.push(func);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Use;
//# sourceMappingURL=Use.js.map