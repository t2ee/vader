"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Param_1 = require("../decorators/Param");
const ParamType_1 = require("../enums/ParamType");
function PathParam(paramKey) {
    return Param_1.default(ParamType_1.default.PathParam, paramKey);
}
exports.default = PathParam;
//# sourceMappingURL=PathParam.js.map