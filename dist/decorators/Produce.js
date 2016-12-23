"use strict";
const MediaType_1 = require("../enums/MediaType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
require("reflect-metadata");
function Produce(type) {
    return (target, key) => {
        const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
        debug(`Mounting @Produce(${MediaType_1.default.toString(type)})`);
        property.ROUTES[key].PRODUCE = type;
        Reflect.defineMetadata('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Produce;
//# sourceMappingURL=Produce.js.map