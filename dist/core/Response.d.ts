export default class Response {
    private _body;
    private _status;
    private _headers;
    body: any;
    status: number;
    headers: Map<string, string>;
}
