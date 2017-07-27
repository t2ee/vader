"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ControllerProperty_1 = require("../core/ControllerProperty");
const Metadata = require("../utils/Metadata");
function decorate(func) {
    return (target, key, index) => {
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        const ret = func(property)(target, key, index);
        Metadata.set('vader:controller:property', property, target);
        return ret;
    };
}
exports.default = decorate;
//# sourceMappingURL=decorate.js.map