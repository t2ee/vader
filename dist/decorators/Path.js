"use strict";
const debug_1 = require('../utils/debug');
const ControllerProperty_1 = require('../core/ControllerProperty');
const Property_1 = require('../enums/Property');
const CLASS = Property_1.default.CLASS;
const debug = debug_1.default('vader:decorator');
function Path(path) {
    return (target, key) => {
        if (key) {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            target[CLASS] = target[CLASS] || new ControllerProperty_1.default();
            target[CLASS].ROUTES[key].PATHS.push(path);
        }
        else {
            debug(`Mounting @Path('${path}')`);
            target.prototype[CLASS] = target.prototype[CLASS] || new ControllerProperty_1.default();
            target.prototype[CLASS].PATH = path;
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Path;
//# sourceMappingURL=Path.js.map