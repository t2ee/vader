import {
    Metadata,
} from '@t2ee/core';
import AfterAllMiddleware from '../AfterAllMiddleware';

function AfterAll(key: string): (target: any, key?: string) => any;
function AfterAll(method: AfterAllMiddleware): (target: any, key?: string) => any;
function AfterAll(keyOrMethod: string | AfterAllMiddleware): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        let method: AfterAllMiddleware = null;
        if (keyOrMethod instanceof String) {
            method = target.prototype[keyOrMethod];
        } else {
            method = keyOrMethod;
        }
        if (key) { // is a method;
            const afteralls: {[key: string]: AfterAllMiddleware[]} =
                Metadata.get('t2ee:vader:route:afterall', target) || {};
            afteralls[key] = afteralls[key] || [];
            afteralls[key].push(method);
            Metadata.set('t2ee:vader:route:afterall', afteralls, target);
        } else { // is on class
            const afteralls: AfterAllMiddleware[] = Metadata.get('t2ee:vader:controller:afterall', target) || [];
            afteralls.push(method);
            Metadata.set('t2ee:vader:controller:afterall', afteralls, target);
        }

        //return target;
    };
}

export default AfterAll;
