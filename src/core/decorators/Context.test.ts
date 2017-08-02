import 'reflect-metadata';
import Context from './Context';
import test from 'ava';
import {
    Container,
} from '@t2ee/core';

test('@Context', t => {
    class User {}
    class Test {
        @Context user: User;
        test(@Context user: User) {}
    }
    t.deepEqual(Container.extractMeta(Test), {
        argument: {},
        parameter: {
            test: {
                0: [{
                    type: Symbol.for('t2ee:vader:context'),
                    declaredType: User,
                    data: new Map<string, string>().set('key', undefined).set('hook', null),
                }]
            }
        },
        property: {
            user: [{
                type: Symbol.for('t2ee:vader:context'),
                declaredType: User,
                data: new Map<string, string>().set('key', undefined).set('hook', null),
            }]
        }
    });
});
