"use strict";
var Metadata;
(function (Metadata) {
    function set(metaKey, metaValue, target, key) {
        return Reflect.defineMetadata(metaKey, metaValue, target, key);
    }
    Metadata.set = set;
    function get(metaKey, target, key) {
        return Reflect.getMetadata(metaKey, target, key);
    }
    Metadata.get = get;
    Metadata.builtIn = {
        TYPE: 'design:type',
        PARAM_TYPE: 'design:paramtypes',
        RETURN_TYPE: 'design:returntype',
    };
})(Metadata || (Metadata = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Metadata;
//# sourceMappingURL=Metadata.js.map