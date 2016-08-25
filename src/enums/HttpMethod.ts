enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
    HEAD,
    OPTIONS,
}
namespace HttpMethod {
    export function toString(method: HttpMethod): string {
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
}

export default HttpMethod;
