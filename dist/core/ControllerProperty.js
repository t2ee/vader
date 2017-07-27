"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouteProperty_1 = require("../core/RouteProperty");
const createArray_1 = require("../utils/createArray");
class ControllerProperty {
    constructor() {
        this.WARES = [];
        this.PARAMS = [];
        this.ROUTES = createArray_1.default(RouteProperty_1.default);
        this.PATH = '';
    }
}
exports.default = ControllerProperty;
//# sourceMappingURL=ControllerProperty.js.map