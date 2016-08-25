enum Status {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    PARTIAL = 206,

    MOVED = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    REDIRECT = 307,
    REDIRECT_PERMANENT = 308,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    TOO_LARGE = 413,
    TOO_LONG = 414,
    UNSUPPORTED = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    TEAPOT = 418,
    UNPROCESSABLE = 422,
    UPGRADE_REQUIRED = 426,
    TOO_MANY = 429,

    INTERNAL_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,


}

namespace Status {
    export function toString(status: Status) {
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
}

export default Status;
