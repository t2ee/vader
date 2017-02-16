declare enum ParamType {
    QueryParam = 0,
    PathParam = 1,
    HeaderParam = 2,
    BodyParam = 3,
    Context = 4,
    External = 5,
}
declare namespace ParamType {
    function toString(type: ParamType): string;
}
export default ParamType;
