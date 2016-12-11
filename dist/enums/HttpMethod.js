"use strict";
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["POST"] = 1] = "POST";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
    HttpMethod[HttpMethod["HEAD"] = 4] = "HEAD";
    HttpMethod[HttpMethod["OPTIONS"] = 5] = "OPTIONS";
})(HttpMethod || (HttpMethod = {}));
(function (HttpMethod) {
    function toString(method) {
        switch (method) {
            case HttpMethod.GET:
                return 'GET';
            case HttpMethod.POST:
                return 'POST';
            case HttpMethod.PUT:
                return 'PUT';
            case HttpMethod.DELETE:
                return 'DELETE';
            case HttpMethod.OPTIONS:
                return 'OPTIONS';
            case HttpMethod.HEAD:
                return 'HEAD';
        }
    }
    HttpMethod.toString = toString;
})(HttpMethod || (HttpMethod = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HttpMethod;
//# sourceMappingURL=HttpMethod.js.map