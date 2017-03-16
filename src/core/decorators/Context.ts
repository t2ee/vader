import {
    injections,
} from '@t2ee/core';


function Context(target: Object, key: string, index?: number) {
    const meta = new Map<string, any>();
    meta.set('by-vader', true);
    meta.set('type', 'context');
    return injections.AutoWired({
        meta,
    })(target, key, index);
}

export default Context;