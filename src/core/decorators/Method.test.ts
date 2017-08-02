import 'reflect-metadata';
import Method from './Method';
import HttpMethod from '../../enums/HttpMethod';
import test from 'ava';
import {
    Metadata,
} from '@t2ee/core';

test('@Method', t => {
    @Method(HttpMethod.GET)
    class Test {
        @Method(HttpMethod.GET)
        test() {}
    }
    t.is(Metadata.get('t2ee:vader:controller:method', Test), HttpMethod.GET);
    t.deepEqual(Metadata.get('t2ee:vader:route:method', Test.prototype), { test: HttpMethod.GET });
});
