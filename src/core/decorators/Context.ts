import {
    AutoWired,
} from '@t2ee/core';


function Context(target: any, key: string, index?: number): any {
    const meta: Map<string, any> = new Map<string, any>();
    meta.set('by-vader', true);
    meta.set('type', 'context');

    return AutoWired({
        meta,
    })(target, key, index);
}

export default Context;
