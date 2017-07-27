"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Charset;
(function (Charset) {
    Charset[Charset["UTF8"] = 0] = "UTF8";
})(Charset || (Charset = {}));
(function (Charset) {
    function toString(charset) {
        switch (charset) {
            case Charset.UTF8:
                return 'utf8';
        }
    }
    Charset.toString = toString;
})(Charset || (Charset = {}));
exports.default = Charset;
//# sourceMappingURL=Charset.js.map