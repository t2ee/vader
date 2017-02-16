import * as Debugger from 'debug';

const cache: any = {};

export default function(name: string) {
    if (!cache[name]) {
        cache[name] = Debugger(name);
    }
    return cache[name];
}
