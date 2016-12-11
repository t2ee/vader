"use strict";
const MediaType_1 = require("../enums/MediaType");
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const Property_1 = require("../enums/Property");
const CLASS = Property_1.default.CLASS;
const debug = debug_1.default('vader:decorator');
function Consume(type) {
    return (target, key) => {
        debug(`Mounting @Consume(${MediaType_1.default.toString(type)})`);
        target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
        target[CLASS].ROUTES[key].CONSUME = type;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Consume;
//# sourceMappingURL=Consume.js.map