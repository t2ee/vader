import {
    Metadata,
} from '@t2ee/core';
import BeforeMiddleware from '../BeforeMiddleware';

function Before(key: string): (target: any, key?: string) => any;
function Before(method: BeforeMiddleware): (target: any, key?: string) => any;
function Before(method: string | BeforeMiddleware): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        if (key) { // is a method;
            const befores: {[key: string]: BeforeMiddleware[]} = Metadata.get('t2ee:vader:route:before', target) || {};
            befores[key] = befores[key] || [];
            befores[key].push(method as any);
            Metadata.set('t2ee:vader:route:before', befores, target);
        } else { // is on class
            const befores: BeforeMiddleware[] = Metadata.get('t2ee:vader:controller:before', target) || [];
            befores.push(method as any);
            Metadata.set('t2ee:vader:controller:before', befores, target);
        }

        //return target;
    };
}

export default Before;
