"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
require("reflect-metadata");
function Path(path) {
    return (target, key) => {
        if (key) {
            const property = Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty_1.default();
            debug(`Mounting @Path('${path}') on method '${key}'`);
            property.ROUTES[key].PATHS.push(path);
            Reflect.defineMetadata('vader:controller:property', property, target);
        }
        else {
            debug(`Mounting @Path('${path}')`);
            const property = Reflect.getMetadata('vader:controller:property', target.prototype) || new ControllerProperty_1.default();
            property.PATH = path;
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Path;
//# sourceMappingURL=Path.js.map