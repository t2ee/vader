"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MediaType_1 = require("../enums/MediaType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const Metadata = require("../utils/Metadata");
const debug = debug_1.default('vader:decorator');
function Consume(type) {
    return (target, key) => {
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        debug(`Mounting @Consume(${MediaType_1.default.toString(type)})`);
        property.ROUTES[key].CONSUME = type;
        Metadata.set('vader:controller:property', property, target);
    };
}
exports.default = Consume;
//# sourceMappingURL=Consume.js.map