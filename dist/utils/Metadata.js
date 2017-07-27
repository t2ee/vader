"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get(key, target) {
    return Reflect.getMetadata(key, target.prototype || target);
}
exports.get = get;
function set(key, value, target) {
    Reflect.defineMetadata(key, value, target.prototype || target);
}
exports.set = set;
//# sourceMappingURL=Metadata.js.map