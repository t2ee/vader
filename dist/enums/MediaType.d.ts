declare enum MediaType {
    TEXT = 0,
    JSON = 1,
    FORM = 2,
    MULTIPART = 3,
}
declare namespace MediaType {
    function toString(type: MediaType): string;
}
export default MediaType;
