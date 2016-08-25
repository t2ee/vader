"use strict";
const Symbol_1 = require('enums/Symbol');
const ControllerProperty_1 = require('core/ControllerProperty');
const RouteProperty_1 = require('core/RouteProperty');
const MediaType_1 = require('enums/MediaType');
const Debugger = require('debug');
const debug = Debugger('decorator');
const Property = Symbol_1.default.Property;
function Produce(type) {
    return (target, key) => {
        debug(`Mounting @Produce(${MediaType_1.default.toString(type)})`);
        target[Property] = target[Property] || new ControllerProperty_1.default();
        target[Property].routes[key] = target[Property].routes[key] ||
            new RouteProperty_1.default();
        target[Property].routes[key].produce = type;
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Produce;
//# sourceMappingURL=Produce.js.map