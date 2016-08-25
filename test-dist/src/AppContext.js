"use strict";
class AppContext {
    constructor() {
        this.wares = [];
        this.routes = {};
        this.params = {};
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppContext;
class RouteContext {
    constructor() {
        this.paths = [];
        this.wares = [];
        this.params = [];
    }
}
exports.RouteContext = RouteContext;
//# sourceMappingURL=AppContext.js.map