import {
    Metadata,
} from '@t2ee/core';

import BeforeMiddleware from '../BeforeMiddleware';

function Before(key: string): (target: any, key?: string) => any;
function Before(method: BeforeMiddleware): (target: any, key?: string) => any;
function Before(keyOrMethod: string | BeforeMiddleware): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        let method: BeforeMiddleware = null;
        if (keyOrMethod instanceof String) {
            method = target.prototype[keyOrMethod];
        } else {
            method = keyOrMethod;
        }
        if (key) { // is a method;
            const befores: {[key: string]: BeforeMiddleware[]} = Metadata.get('t2ee:vader:route:before', target) || {};
            befores[key] = befores[key] || [];
            befores[key].push(method);
            Metadata.set('t2ee:vader:route:before', befores, target);
        } else { // is on class
            const befores: BeforeMiddleware[] = Metadata.get('t2ee:vader:controller:before', target) || [];
            befores.push(method);
            Metadata.set('t2ee:vader:controller:before', befores, target);
        }

        //return target;
    };
}

export default Before;
