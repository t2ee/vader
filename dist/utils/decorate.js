"use strict";
const ControllerProperty_1 = require("../core/ControllerProperty");
require("reflect-metadata");
function decorate(func) {
    return (target, key, index) => {
        let property;
        if (key) {
            property = Reflect.getMetadata('vader:controller:property', target);
        }
        else {
            property = Reflect.getMetadata('vader:controller:property', target.prototype);
        }
        property = property || new ControllerProperty_1.default();
        const ret = func(property)(target, key, index);
        if (key) {
            Reflect.defineMetadata('vader:controller:property', property, target);
        }
        else {
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
        return ret;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decorate;
//# sourceMappingURL=decorate.js.map