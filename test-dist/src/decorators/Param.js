"use strict";
const Symbol_1 = require('../enums/Symbol');
const ControllerProperty_1 = require('../core/ControllerProperty');
const RouteProperty_1 = require('../core/RouteProperty');
const ParamType_1 = require('../enums/ParamType');
const Debugger = require('debug');
require('reflect-metadata');
const debug = Debugger('decorator');
const Property = Symbol_1.default.Property;
function Param(paramType, paramKey) {
    return (target, key, index) => {
        target[Property] = target[Property] || new ControllerProperty_1.default();
        if (index !== undefined) {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey}')} on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            target[Property].routes[key] = target[Property].routes[key] ||
                new RouteProperty_1.default();
            target[Property].routes[key].params[index] = {
                type,
                paramKey,
                paramType,
            };
        }
        else {
            debug(`Mounting @${ParamType_1.default.toString(paramType)}('${paramKey}')}`);
            let type = Reflect.getMetadata('design:type', target, key);
            target[Property].params[key] = {
                type,
                paramKey,
                paramType,
            };
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Param;
//# sourceMappingURL=Param.js.map