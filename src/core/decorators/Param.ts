import {
    injections,
} from '@t2ee/core';
import ParamHook from '../ParamHook';


function Param(type: string, hook: ParamHook, key?: string): ParameterDecorator
function Param(type: string, hook: ParamHook, key?: string): PropertyDecorator
function Param(type: string, hook: ParamHook, key?: string): ParameterDecorator | PropertyDecorator {
    const meta = new Map<string, any>();
    meta.set('by-vader', true);
    meta.set('type', 'param');
    meta.set('param-type', type);
    meta.set('param-key', key);
    meta.set('param-hook', hook);
    return injections.AutoWired({
        meta,
    });
}

export default Param;