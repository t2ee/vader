"use strict";
class ProxyMap extends Proxy {
    constructor(type) {
        super();
        this.data = {};
        this.type = type;
    }
    get(key) {
        //return this.data[key] || null;
        if (this.data[key] === null) {
            this.data[key] = new this.type();
        }
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProxyMap;
//# sourceMappingURL=ProxyMap.js.map