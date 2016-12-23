"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
const Metadata = require("../utils/Metadata");
function Use(func) {
    return (target, key) => {
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        if (key) {
            debug(`Mounting @Use(${func}) on method '${key}'`);
            property.ROUTES[key].WARES.push(func);
        }
        else {
            debug(`Mounting @Use(${func})`);
            property.WARES.push(func);
        }
        Metadata.set('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Use;
//# sourceMappingURL=Use.js.map