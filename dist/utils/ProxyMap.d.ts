export default class ProxyMap<T> extends Proxy {
    private data;
    private type;
    constructor(type: new () => T);
    get(key: string): T;
    set(key: string, value: T): void;
}
