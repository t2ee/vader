import Request from './Request';
import test from 'ava';
import HttpMethod from '../enums/HttpMethod';

test('Request', t => {
    const request = new Request({
        request: {
            headers: {
                'key': 'value',
            },
            query: {
                'qkey': 'qvalue',
            },
            path: '/path',
            url: 'http://localhost/path',
            protocol: 'HTTP1.1',
        },
            method: 'get',
    } as any, new Map<string, string>().set('hello', 'world'));
    t.is(request.url, 'http://localhost/path');
    t.is(request.path, '/path');
    t.is(request.method, HttpMethod.GET);
    t.is(request.version, 'HTTP1.1');
    t.deepEqual(request.query, new Map<string, string>().set('qkey', 'qvalue'));
    t.deepEqual(request.params, new Map<string, string>().set('hello', 'world'));
    t.deepEqual(request.headers, new Map<string, string>().set('key', 'value'));
});
