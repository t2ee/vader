import {
    utils,
} from '@t2ee/core';
const { Metadata } = utils;
import HttpMethod from '../../enums/HttpMethod';
import AfterMiddleware from '../AfterMiddleware';

function After(key: string): (target: any, key?: string) => void;
function After(method: AfterMiddleware):  (target: any, key?: string) => void;
function After(keyOrMethod: string | AfterMiddleware) {
    return (target: any, key?: string) => {
        let method: AfterMiddleware = null;
        if (keyOrMethod instanceof String) {
            method = target.prototype[keyOrMethod];
        } else {
            method = keyOrMethod;
        }
        if (key) { // is a method;
            const afters = Metadata.get('vader:route:after', target) || {};
            afters[key] = afters[key] || [];
            afters[key].push(method);
            Metadata.set('vader:route:after', afters, target);
        } else { // is on class
            const afters = Metadata.get('vader:controller:after', target) || [];
            afters.push(method);
            Metadata.set('vader:controller:after', afters, target);
        }
    }
}

export default After;