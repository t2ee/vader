"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MediaType_1 = require("../enums/MediaType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
const Metadata = require("../utils/Metadata");
function Produce(type) {
    return (target, key) => {
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        debug(`Mounting @Produce(${MediaType_1.default.toString(type)})`);
        property.ROUTES[key].PRODUCE = type;
        Metadata.set('vader:controller:property', property, target);
    };
}
exports.default = Produce;
//# sourceMappingURL=Produce.js.map