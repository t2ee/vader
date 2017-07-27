"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Param_1 = require("../decorators/Param");
const ParamType_1 = require("../enums/ParamType");
function HeaderParam(paramKey) {
    return Param_1.default(ParamType_1.default.HeaderParam, paramKey);
}
exports.default = HeaderParam;
//# sourceMappingURL=HeaderParam.js.map