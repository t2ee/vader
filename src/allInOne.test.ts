import 'reflect-metadata';
import test from 'ava';
import * as Koa from 'koa';
import * as http from 'superkoa';
import * as assert from 'assert';
import {
    Router,
    After,
    AfterAll,
    Before,
    Path,
    GET,
    POST,
    DELETE,
    PUT,
    Response,
    Request,
    Consumes,
    Produces,
    Body,
    PathParam,
    PathParams,
    HeaderParam,
    Headers,
    Query,
    QueryParam,
    Context,
    ErrorHandler,
} from './';
import {
    ConfigurationStore,
    Configuration,
    Bean,
    Component,
} from '@t2ee/core';
import * as path from 'path';

ConfigurationStore.loadFile(path.resolve(__dirname, '../logger'));
const router = Router.newInstance();

class MyError extends Error {}

@Configuration
class Config {
    @Bean('ErrorHandler')
    errorHandler(): ErrorHandler {
        return {
            async handle(req: Request, error: Error): Promise<Response> {
                throw error;
            },
            supportedErrors() {
                return [MyError];
            },
        }
    }
}

test('ErrorHandler.supportedErrors', t => {
    t.false(router['shouldErrorHandlerHandleError'](new Error()));
    t.true(router['shouldErrorHandlerHandleError'](new MyError()));
})

@Path('/basic')
class BasicTest {

    @GET
    @Path('/get')
    @Produces('text/plain')
    async get() {
        const response = new Response();
        response.body = 'hello world';
        return response;
    }

    @PUT
    @Path('/put')
    @Produces('text/plain')
    async put() {
        const response = new Response();
        response.body = 'hello world put';
        return response;
    }

    @POST
    @Path('/post')
    @Produces('text/plain')
    async post() {
        const response = new Response();
        response.body = 'hello world post';
        return response;
    }

    @DELETE
    @Path('/delete')
    @Produces('text/plain')
    async del() {
        const response = new Response();
        response.body = 'hello world delete';
        return response;
    }

    @GET
    @Path('/throw')
    async throw() {
        throw new Error('error');
    }

    @POST
    @Path('/json/:param')
    @Consumes('application/json')
    @Produces('application/json')
    async json(
        @Body body,
        @PathParams params,
        @PathParam('param') param,
        @Query query,
        @QueryParam('hello') hello,
        @Headers headers,
        @HeaderParam('content-type') contentType,
    ) {
        assert(JSON.stringify(body) === JSON.stringify({ 'hello': 'world' }));
        assert(params.get('param') === 'test');
        assert(query.get('hello') === 'world');
        assert(param === 'test');
        assert(hello === 'world');
        assert(headers.get('content-type') === 'application/json');
        assert(contentType === 'application/json');
        const response = new Response();
        response.body = {
            'hello': 'world',
        };
        return response;
    }
}

let visited1 = false;
let visited2 = false;

@Before(async (request: Request) => {
    request.extra.set('before', true);
    return request;
})
@After(async (res: Response) => {
    res.headers.set('after', 'true');
    return res;
})
@AfterAll(async (req, res) => {
    visited1 = true;
})
@Path('/middleware')
class MiddlewareTest {

    async after(res: Response) {
        res.headers.set('after2', 'true');
        return res;
    }

    async before(req: Request) {
        req.extra.set('before2', true);
        return req;
    }

    async afterAll(req: Request, res: Response) {
        visited2 = true;
    }

    @After('after')
    @Before('before')
    @AfterAll('afterAll')
    @GET
    @Path('/class')
    async class(@Context req: Request) {
        assert(req.extra.get('before'));
        assert(req.extra.get('before2'));
        const response = new Response();
        response.body = 'hello world';
        return response;
    }
}


router.use(BasicTest);
router.use(MiddlewareTest);

const app = new Koa();
app.use(router.routes());

test('Basic Get Request', async t => {
    const res = await http(app).get('/basic/get');
    t.is(res.text, 'hello world');
    t.is(res.status, 200);
    t.is(res.headers['content-type'], 'text/plain');
});

test('Basic Post Request', async t => {
    const res = await http(app).post('/basic/post');
    t.is(res.text, 'hello world post');
    t.is(res.status, 200);
    t.is(res.headers['content-type'], 'text/plain');
});

test('Basic Put Request', async t => {
    const res = await http(app).put('/basic/put');
    t.is(res.text, 'hello world put');
    t.is(res.status, 200);
    t.is(res.headers['content-type'], 'text/plain');
});

test('Basic Delete Request', async t => {
    const res = await http(app).del('/basic/delete');
    t.is(res.text, 'hello world delete');
    t.is(res.status, 200);
    t.is(res.headers['content-type'], 'text/plain');
});

test('Http 404', async t => {
    const res = await http(app).get('/basic/notExist');
    t.is(res.text, 'Not Found');
    t.is(res.status, 404);
    t.true(res.headers['content-type'].indexOf('text/plain') !== -1);
});

test('Http 500', async t => {
    const res = await http(app).get('/basic/throw');
    t.is(res.text, 'Internal Server Error');
    t.is(res.status, 500);
    t.true(res.headers['content-type'].indexOf('text/plain') !== -1);
});

test('Basic Parameter Test(JSON)', async t => {
    const res = await http(app).post('/basic/json/test?hello=world').send({ hello: 'world' });
    t.deepEqual(res.body, { hello: 'world' });
    t.is(res.status, 200);
    t.is(res.headers['content-type'], 'application/json');
});

test('Middlewares', async t => {
    const res = await http(app).get('/middleware/class');
    t.is(res.text, 'hello world');
    t.is(res.status, 200);
    t.is(res.headers['after'], 'true');
    t.is(res.headers['after2'], 'true');
    t.true(visited1);
    t.true(visited2);
});
