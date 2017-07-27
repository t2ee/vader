import {
    Metadata,
} from '@t2ee/core';
import AfterMiddleware from '../AfterMiddleware';

function After(key: string): (target: any, key?: string) => any;
function After(method: AfterMiddleware): (target: any, key?: string) => any;
function After(keyOrMethod: string | AfterMiddleware): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        let method: AfterMiddleware = null;
        if (keyOrMethod instanceof String) {
            method = target.prototype[keyOrMethod];
        } else {
            method = keyOrMethod;
        }
        if (key) { // is a method;
            const afters: {[key: string]: AfterMiddleware[]} = Metadata.get('t2ee:vader:route:after', target) || {};
            afters[key] = afters[key] || [];
            afters[key].push(method);
            Metadata.set('t2ee:vader:route:after', afters, target);
        } else { // is on class
            const afters: AfterMiddleware[] = Metadata.get('t2ee:vader:controller:after', target) || [];
            afters.push(method);
            Metadata.set('t2ee:vader:controller:after', afters, target);
        }

        //return target;
    };
}

export default After;
