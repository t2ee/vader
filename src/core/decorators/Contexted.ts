import {
    AutoWired,
} from '@t2ee/core';
import ContextHook from '../ContextHook';

function Contexted(hook: ContextHook, key?: string): (target: any, key: string, index?: number) => any {
    const data: Map<string, any> = new Map<string, any>();
    data.set('key', key);
    data.set('hook', hook);

    return AutoWired(Symbol.for('t2ee:vader:context'), data);
}

export default Contexted;
