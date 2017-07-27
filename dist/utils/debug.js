"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debugger = require("debug");
const cache = {};
function default_1(name) {
    if (!cache[name]) {
        cache[name] = Debugger(name);
    }
    return cache[name];
}
exports.default = default_1;
//# sourceMappingURL=debug.js.map