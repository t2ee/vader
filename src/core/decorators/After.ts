import {
    Metadata,
} from '@t2ee/core';
import AfterMiddleware from '../AfterMiddleware';

function After(key: string): (target: any, key?: string) => any;
function After(method: AfterMiddleware): (target: any, key?: string) => any;
function After(method: string | AfterMiddleware): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        if (key) { // is a method;
            const afters: {[key: string]: AfterMiddleware[]} = Metadata.get('t2ee:vader:route:after', target) || {};
            afters[key] = afters[key] || [];
            afters[key].push(method as any);
            Metadata.set('t2ee:vader:route:after', afters, target);
        } else { // is on class
            const afters: AfterMiddleware[] = Metadata.get('t2ee:vader:controller:after', target) || [];
            afters.push(method as any);
            Metadata.set('t2ee:vader:controller:after', afters, target);
        }

        //return target;
    };
}

export default After;
