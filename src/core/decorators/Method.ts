import {
    Metadata,
} from '@t2ee/core';
import HttpMethod from '../../enums/HttpMethod';

function Method(method: HttpMethod): (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => any {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>): any =>  {
        if (key) { // is a method;
            const methods: {[key: string]: HttpMethod } = Metadata.get('vader:route:method', target) || {};
            methods[key] = method;
            Metadata.set('vader:route:method', methods, target);
        } else { // is on class
            Metadata.set('vader:controller:method', method, target);
        }

        return target;
    };
}

export default Method;
