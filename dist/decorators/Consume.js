"use strict";
const MediaType_1 = require("../enums/MediaType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
require("reflect-metadata");
const debug = debug_1.default('vader:decorator');
function Consume(type) {
    return (target, key) => {
        const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
        debug(`Mounting @Consume(${MediaType_1.default.toString(type)})`);
        property.ROUTES[key].CONSUME = type;
        Reflect.defineMetadata('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Consume;
//# sourceMappingURL=Consume.js.map