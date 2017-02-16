"use strict";
const debug_1 = require("../utils/debug");
const ControllerProperty_1 = require("../core/ControllerProperty");
const debug = debug_1.default('vader:decorator');
const Metadata = require("../utils/Metadata");
function Path(path) {
    return (target, key) => {
        const property = Metadata.get('vader:controller:property', target) || new ControllerProperty_1.default();
        if (key) {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            property.ROUTES[key].PATHS.push(path);
        }
        else {
            debug(`Mounting @Path('${path}')`);
            property.PATH = path;
        }
        Metadata.set('vader:controller:property', property, target);
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Path;
//# sourceMappingURL=Path.js.map