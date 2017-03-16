
export default class Response {
    private _body: any = 'Not Found';
    private _status: number = 404;
    private _headers = new Map<string, string>();

    public get body(): any {
        return this._body;
    }

    public get status(): number {
        return this._status; 
    }

    public get headers(): Map<string, string> {
        return this._headers;
    }

    public set body(body: any) {
        this._body = body;
    }

    public set status(status: number) {
        this._status = status;
    }

    public set headers(headers: Map<string, string>) {
        this._headers = headers;
    }
}