"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createArray(type) {
    const result = new Proxy(new Array(), {
        get: (target, name) => {
            if (target[name] === undefined) {
                target[name] = new type();
            }
            return target[name];
        }
    });
    return result;
}
exports.default = createArray;
//# sourceMappingURL=createArray.js.map