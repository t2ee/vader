import {
    AutoWired,
} from '@t2ee/core';
import ParamHook from '../ParamHook';


function Param(hook: ParamHook, key?: string): (target: any, key: string, index?: number) => any {
    const meta: Map<string, any> = new Map<string, any>();
    meta.set('by-vader', true);
    meta.set('type', 'param');
    meta.set('param-key', key);
    meta.set('param-hook', hook);

    return AutoWired({
        meta,
    });
}

export default Param;
