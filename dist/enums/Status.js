"use strict";
var Status;
(function (Status) {
    Status[Status["OK"] = 200] = "OK";
    Status[Status["CREATED"] = 201] = "CREATED";
    Status[Status["ACCEPTED"] = 202] = "ACCEPTED";
    Status[Status["NO_CONTENT"] = 204] = "NO_CONTENT";
    Status[Status["PARTIAL"] = 206] = "PARTIAL";
    Status[Status["MOVED"] = 301] = "MOVED";
    Status[Status["FOUND"] = 302] = "FOUND";
    Status[Status["SEE_OTHER"] = 303] = "SEE_OTHER";
    Status[Status["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    Status[Status["REDIRECT"] = 307] = "REDIRECT";
    Status[Status["REDIRECT_PERMANENT"] = 308] = "REDIRECT_PERMANENT";
    Status[Status["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Status[Status["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    Status[Status["FORBIDDEN"] = 403] = "FORBIDDEN";
    Status[Status["NOT_FOUND"] = 404] = "NOT_FOUND";
    Status[Status["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    Status[Status["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    Status[Status["TIMEOUT"] = 408] = "TIMEOUT";
    Status[Status["CONFLICT"] = 409] = "CONFLICT";
    Status[Status["GONE"] = 410] = "GONE";
    Status[Status["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    Status[Status["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    Status[Status["TOO_LARGE"] = 413] = "TOO_LARGE";
    Status[Status["TOO_LONG"] = 414] = "TOO_LONG";
    Status[Status["UNSUPPORTED"] = 415] = "UNSUPPORTED";
    Status[Status["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    Status[Status["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    Status[Status["TEAPOT"] = 418] = "TEAPOT";
    Status[Status["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
    Status[Status["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    Status[Status["TOO_MANY"] = 429] = "TOO_MANY";
    Status[Status["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    Status[Status["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    Status[Status["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    Status[Status["UNAVAILABLE"] = 503] = "UNAVAILABLE";
    Status[Status["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(Status || (Status = {}));
(function (Status) {
    function toString(status) {
        switch (status) {
            case Status.OK:
                return 'OK';
            case Status.CREATED:
                return 'CREATED';
            case Status.ACCEPTED:
                return 'ACCEPTED';
            case Status.NO_CONTENT:
                return 'NO CONTENT';
            case Status.PARTIAL:
                return 'PARTIAL CONTENT';
            case Status.MOVED:
                return 'MOVED PERMANENTLY';
            case Status.FOUND:
                return 'FOUND';
            case Status.SEE_OTHER:
                return 'SEE OTHER';
            case Status.NOT_MODIFIED:
                return 'NOT MODIFIED';
            case Status.REDIRECT:
                return 'TEMPORARY REDIRECT';
            case Status.REDIRECT_PERMANENT:
                return 'PERMANENT REDIRECT';
            case Status.BAD_REQUEST:
                return 'BAD REQUEST';
            case Status.UNAUTHORIZED:
                return 'UNAUTHORIZED';
            case Status.FORBIDDEN:
                return 'FORBIDDEN';
            case Status.NOT_FOUND:
                return 'NOT FOUND';
            case Status.METHOD_NOT_ALLOWED:
                return 'METHOD NOT ALLOWED';
            case Status.NOT_ACCEPTABLE:
                return 'NOT ACCEPTABLE';
            case Status.TIMEOUT:
                return 'TIMEOUT';
            case Status.CONFLICT:
                return 'CONFLICT';
            case Status.GONE:
                return 'GONE';
            case Status.LENGTH_REQUIRED:
                return 'LENGTH REQUIRED';
            case Status.PRECONDITION_FAILED:
                return 'PRECONDITION FAILED';
            case Status.TOO_LARGE:
                return 'PAYLOAD TOO LARGE';
            case Status.TOO_LONG:
                return 'URI TOO LONG';
            case Status.UNSUPPORTED:
                return 'MEDIA-TYPE UNSUPPORTED';
            case Status.RANGE_NOT_SATISFIABLE:
                return 'RANGE NOT SATISFIABLE';
            case Status.EXPECTATION_FAILED:
                return 'EXPECTATION FAILED';
            case Status.TEAPOT:
                return 'I\'M A TEAPOT';
            case Status.UNPROCESSABLE:
                return 'UNPROCESSABLE ENTITY';
            case Status.UPGRADE_REQUIRED:
                return 'UPGRADE REQUIRED';
            case Status.TOO_MANY:
                return 'TOO MANY REQUESTS';
            case Status.INTERNAL_ERROR:
                return 'INTERNAL ERROR';
            case Status.NOT_IMPLEMENTED:
                return 'NOT IMPLEMENTED';
            case Status.BAD_GATEWAY:
                return 'BAD GATEWAY';
            case Status.UNAVAILABLE:
                return 'UNAVAILABLE';
            case Status.GATEWAY_TIMEOUT:
                return 'GATEWAY TIMEOUT';
        }
    }
    Status.toString = toString;
})(Status || (Status = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Status;
//# sourceMappingURL=Status.js.map