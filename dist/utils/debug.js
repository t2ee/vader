"use strict";
const Debugger = require("debug");
const cache = {};
function default_1(name) {
    if (!cache[name]) {
        cache[name] = Debugger(name);
    }
    return cache[name];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=debug.js.map