"use strict";
const ParamType_1 = require('../enums/ParamType');
const debug_1 = require('../utils/debug');
require('reflect-metadata');
const ControllerProperty_1 = require('../core/ControllerProperty');
const Property_1 = require('../enums/Property');
const CLASS = Property_1.default.CLASS;
const debug = debug_1.default('vader:decorator');
function Param(paramType, paramKey) {
    return (target, key, index) => {
        if (index !== undefined) {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey || ''}') on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
            target[CLASS].ROUTES[key].PARAMS[index] = {
                type,
                paramKey,
                paramType,
                key,
            };
        }
        else {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey || ''}') on ${key}`);
            let type = Reflect.getMetadata('design:type', target, key);
            target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
            target[CLASS].PARAMS.push({
                type,
                paramKey,
                paramType,
                key,
            });
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Param;
//# sourceMappingURL=Param.js.map