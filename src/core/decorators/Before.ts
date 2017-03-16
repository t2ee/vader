import {
    utils,
} from '@t2ee/core';
const { Metadata } = utils;
import HttpMethod from '../../enums/HttpMethod';
import BeforeMiddleware from '../BeforeMiddleware';

function Before(key: string): (target: any, key?: string) => void;
function Before(method: BeforeMiddleware):  (target: any, key?: string) => void;
function Before(keyOrMethod: string | BeforeMiddleware) {
    return (target: any, key?: string) => {
        let method: BeforeMiddleware = null;
        if (keyOrMethod instanceof String) {
            method = target.prototype[keyOrMethod];
        } else {
            method = keyOrMethod;
        }
        if (key) { // is a method;
            const afters = Metadata.get('vader:route:before', target) || {};
            afters[key] = afters[key] || [];
            afters[key].push(method);
            Metadata.set('vader:route:before', afters, target);
        } else { // is on class
            console.log('here here')
            const afters = Metadata.get('vader:controller:before', target) || [];
            afters.push(method);
            Metadata.set('vader:controller:before', afters, target);
        }
    }
}

export default Before;