"use strict";
var MediaType;
(function (MediaType) {
    MediaType[MediaType["TEXT"] = 0] = "TEXT";
    MediaType[MediaType["JSON"] = 1] = "JSON";
    MediaType[MediaType["FORM"] = 2] = "FORM";
    MediaType[MediaType["MULTIPART"] = 3] = "MULTIPART";
})(MediaType || (MediaType = {}));
(function (MediaType) {
    function toString(type) {
        switch (type) {
            case MediaType.TEXT:
                return 'text/plain';
            case MediaType.JSON:
                return 'application/json';
            case MediaType.FORM:
                return 'application/x-www-form-urlencoded';
            case MediaType.MULTIPART:
                return 'multipart/form-data';
        }
    }
    MediaType.toString = toString;
})(MediaType || (MediaType = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MediaType;
//# sourceMappingURL=MediaType.js.map