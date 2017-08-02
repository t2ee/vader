import Response from './Response';
import test from 'ava';

test('Response', t => {
    const response = new Response();
    t.is(response.status, 404);
    response.body = 'test';
    t.is(response.body, 'test');
    t.is(response.status, 200);
    response.headers.set('hello', 'world');
    t.deepEqual(response.headers, new Map<string, string>().set('hello', 'world'));
    response.extra.set('hello', 'world');
    t.deepEqual(response.extra, new Map<string, string>().set('hello', 'world'));
});
