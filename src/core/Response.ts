
class Response {
    private _body: any = 'Not Found';
    private _status: number = 404;
    private _headers: Map<string, string> = new Map<string, string>();
    private _extra: Map<string, any> = new Map<string, any>();

    public get body(): any {
        return this._body;
    }

    public set body(body: any) {
        this._status = 200;
        this._body = body;
    }

    public get status(): number {
        return this._status;
    }

    public set status(status: number) {
        this._status = status;
    }

    public get headers(): Map<string, string> {
        return this._headers;
    }

    public set headers(headers: Map<string, string>) {
        this._headers = headers;
    }

    public get extra(): Map<string, any> {
        return this._extra;
    }

    public set extra(extra: Map<string, any>) {
        this._extra = extra;
    }
}

export default Response;
