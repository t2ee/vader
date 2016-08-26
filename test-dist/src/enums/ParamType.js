"use strict";
var ParamType;
(function (ParamType) {
    ParamType[ParamType["QueryParam"] = 0] = "QueryParam";
    ParamType[ParamType["PathParam"] = 1] = "PathParam";
    ParamType[ParamType["HeaderParam"] = 2] = "HeaderParam";
    ParamType[ParamType["BodyParam"] = 3] = "BodyParam";
    ParamType[ParamType["Context"] = 4] = "Context";
})(ParamType || (ParamType = {}));
var ParamType;
(function (ParamType) {
    function toString(type) {
        switch (type) {
            case ParamType.QueryParam:
                return 'QueryParam';
            case ParamType.PathParam:
                return 'PathParam';
            case ParamType.HeaderParam:
                return 'HeaderParam';
            case ParamType.BodyParam:
                return 'BodyParam';
            case ParamType.Context:
                return 'Context';
        }
    }
    ParamType.toString = toString;
})(ParamType || (ParamType = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ParamType;
//# sourceMappingURL=ParamType.js.map