"use strict";
const HttpMethod_1 = require("../enums/HttpMethod");
const Method_1 = require("../core/decorators/Method");
function POST(target, method, descriptor) {
    Method_1.default(HttpMethod_1.default.POST)(target, method, descriptor);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = POST;
//# sourceMappingURL=POST.js.map