"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createArray;
//# sourceMappingURL=createArray.js.map