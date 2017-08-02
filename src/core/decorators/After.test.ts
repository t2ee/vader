import 'reflect-metadata';
import After from './After';
import test from 'ava';
import {
    Metadata,
} from '@t2ee/core';

test('@After', t => {
    @After(null)
    class Test {
        @After(null)
        test() {}
    }
    t.deepEqual(Metadata.get('t2ee:vader:controller:after', Test), [null]);
    t.deepEqual(Metadata.get('t2ee:vader:route:after', Test.prototype), { test: [null] });
});
