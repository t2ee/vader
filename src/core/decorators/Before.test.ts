import 'reflect-metadata';
import Before from './Before';
import test from 'ava';
import {
    Metadata,
} from '@t2ee/core';

test('@Before', t => {
    @Before(null)
    class Test {
        @Before(null)
        test() {}
    }
    t.deepEqual(Metadata.get('t2ee:vader:controller:before', Test), [null]);
    t.deepEqual(Metadata.get('t2ee:vader:route:before', Test.prototype), { test: [null] });
});
