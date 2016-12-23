"use strict";
const ParamType_1 = require("../enums/ParamType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
require("reflect-metadata");
function Param(paramType, paramKey) {
    return (target, key, index) => {
        const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
        if (index !== undefined) {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey || ''}') on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            property.ROUTES[key].PARAMS[index] = {
                type,
                paramKey,
                paramType,
                key,
            };
        }
        else {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey || ''}') on ${key}`);
            let type = Reflect.getMetadata('design:type', target, key);
            property.PARAMS.push({
                type,
                paramKey,
                paramType,
                key,
            });
        }
        Reflect.defineMetadata('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Param;
//# sourceMappingURL=Param.js.map