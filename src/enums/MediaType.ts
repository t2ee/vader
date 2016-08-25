enum MediaType {
    TEXT,
    JSON,
    FORM,
    MULTIPART,
}
namespace MediaType {
    export function toString(type: MediaType):string {
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
}

export default MediaType;
