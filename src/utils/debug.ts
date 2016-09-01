import * as Debugger from 'debug';

const cache = {};

export default function(name) {
    if (!cache[name]) {
        cache[name] = Debugger(name);
    }
    return cache[name];
}
