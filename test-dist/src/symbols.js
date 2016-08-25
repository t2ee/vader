"use strict";
const Context = Symbol();
exports.Context = Context;
const ParamType = {
    QueryParam: Symbol(),
    PathParam: Symbol(),
    HeaderParam: Symbol(),
    BodyParam: Symbol(),
    Query: Symbol(),
    Params: Symbol(),
    Headers: Symbol(),
    Body: Symbol(),
    AppContext: Symbol(),
    KoaContext: Symbol(),
};
exports.ParamType = ParamType;
//# sourceMappingURL=symbols.js.map