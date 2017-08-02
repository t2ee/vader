import 'reflect-metadata';
import AfterAll from './AfterAll';
import test from 'ava';
import {
    Metadata,
} from '@t2ee/core';

test('@AfterAll', t => {
    @AfterAll(null)
    class Test {
        @AfterAll(null)
        test() {}
    }
    t.deepEqual(Metadata.get('t2ee:vader:controller:afterall', Test), [null]);
    t.deepEqual(Metadata.get('t2ee:vader:route:afterall', Test.prototype), { test: [null] });
});
