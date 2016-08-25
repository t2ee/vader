declare enum HttpMethod {
    GET = 0,
    POST = 1,
    PUT = 2,
    DELETE = 3,
    HEAD = 4,
    OPTIONS = 5,
}
declare namespace HttpMethod {
    function toString(method: HttpMethod): string;
}
export default HttpMethod;
