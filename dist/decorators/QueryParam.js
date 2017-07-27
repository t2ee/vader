"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Param_1 = require("../decorators/Param");
const ParamType_1 = require("../enums/ParamType");
function QueryParam(paramKey) {
    return Param_1.default(ParamType_1.default.QueryParam, paramKey);
}
exports.default = QueryParam;
//# sourceMappingURL=QueryParam.js.map