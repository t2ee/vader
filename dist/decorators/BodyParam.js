"use strict";
const Param_1 = require("../decorators/Param");
const ParamType_1 = require("../enums/ParamType");
function BodyParam(paramKey) {
    return Param_1.default(ParamType_1.default.BodyParam, paramKey);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BodyParam;
//# sourceMappingURL=BodyParam.js.map