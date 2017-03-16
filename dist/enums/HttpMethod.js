"use strict";
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["DELETE"] = 2] = "DELETE";
    HttpMethod[HttpMethod["PUT"] = 3] = "PUT";
    HttpMethod[HttpMethod["PATCH"] = 4] = "PATCH";
})(HttpMethod || (HttpMethod = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpMethod;
//# sourceMappingURL=HttpMethod.js.map