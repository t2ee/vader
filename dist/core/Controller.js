"use strict";
const RouteProperty_1 = require('../core/RouteProperty');
const Parameter_1 = require('../core/Parameter');
const createArray_1 = require('../utils/createArray');
class Controller {
    constructor() {
        this.WARES = [];
        this.PARAMS = createArray_1.default(Parameter_1.default);
        this.ROUTES = createArray_1.default(RouteProperty_1.default);
        this.PATH = '';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Controller;
//# sourceMappingURL=Controller.js.map