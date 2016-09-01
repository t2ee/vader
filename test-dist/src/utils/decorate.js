"use strict";
const ControllerProperty_1 = require('../core/ControllerProperty');
const Property_1 = require('../enums/Property');
const CLASS = Property_1.default.CLASS;
function decorate(func) {
    return (target, key, index) => {
        let property;
        if (key) {
            property = target[CLASS] || new ControllerProperty_1.default();
        }
        else {
            property = target.prototype[CLASS] || new ControllerProperty_1.default();
        }
        const ret = func(property)(target, key, index);
        if (key) {
            target[CLASS] = property;
        }
        else {
            target.prototype[CLASS] = property;
        }
        return ret;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decorate;
//# sourceMappingURL=decorate.js.map