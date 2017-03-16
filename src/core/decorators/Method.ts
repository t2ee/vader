import {
    utils,
} from '@t2ee/core';
const { Metadata } = utils;
import HttpMethod from '../../enums/HttpMethod';

function Method(method: HttpMethod): MethodDecorator
function Method(method: HttpMethod): ClassDecorator
function Method(method: HttpMethod): MethodDecorator | ClassDecorator {
    return <T extends Function, M>(target: T, key?: string, descriptor?: TypedPropertyDescriptor<M>) =>  {
        if (key) { // is a method;
            const methods = Metadata.get('vader:route:method', target) || {};
            methods[key] = method;
            Metadata.set('vader:route:method', methods, target);
        } else { // is on class
            Metadata.set('vader:controller:method', method, target);
        }
    }
}

export default Method;