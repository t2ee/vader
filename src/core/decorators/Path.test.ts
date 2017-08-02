import 'reflect-metadata';
import Path from './Path';
import test from 'ava';
import {
    Metadata,
} from '@t2ee/core';

test('@Path', t => {
    @Path('test')
    class Test {
        @Path('child')
        test() {}
    }
    t.is(Metadata.get('t2ee:vader:controller:path', Test), 'test');
    t.deepEqual(Metadata.get('t2ee:vader:route:path', Test.prototype), { test: 'child' });
});
