import * as vader from '../src';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
const {
    GET,
    Path,
    QueryParam,
    PathParam,
    HeaderParam,
} = vader.decorators;
const {
    Response,
    Router,
} = vader.core;

@Path('/get')
class TestGetController {
    @QueryParam()
    queryParam;
    @QueryParam('echo')
    queryEcho: string;
    @PathParam()
    pathParam;
    @PathParam('echo')
    pathEcho: string;
    @HeaderParam()
    headerParam;
    @HeaderParam('echo')
    headerEcho: string;

    @GET
    @Path('/basic')
    async basic() {
        chai.assert.equal(Object.keys(this.queryParam).length, 0);
        chai.assert.equal(Object.keys(this.pathParam).length, 0);
        return new Response()
            .status(200)
            .entity('hello world')
            .build();
    }

    @GET
    @Path('/query')
    async query(
        @QueryParam() query,
        @QueryParam('echo') echo
    ) {
        chai.assert.equal(query.echo, 'hello world');
        chai.assert.equal(echo, 'hello world');
        chai.assert.equal(this.queryParam.echo, 'hello world');
        chai.assert.equal(this.queryEcho, 'hello world');
        return new Response()
            .status(200)
            .entity(echo)
            .build();
    }

    @GET
    @Path('/path/:echo')
    async path(
        @PathParam() path,
        @PathParam('echo') echo
    ) {
        chai.assert.equal(path.echo, 'hello%20world');
        chai.assert.equal(echo, 'hello%20world');
        chai.assert.equal(this.pathParam.echo, 'hello%20world');
        chai.assert.equal(this.pathEcho, 'hello%20world');
        return new Response()
            .status(200)
            .entity(echo)
            .build();
    }

    @GET
    @Path('/header')
    async header(
        @HeaderParam() header,
        @HeaderParam('echo') echo
    ) {
        chai.assert.equal(header.echo, 'hello world');
        chai.assert.equal(echo, 'hello world');
        chai.assert.equal(this.headerParam.echo, 'hello world');
        chai.assert.equal(this.headerEcho, 'hello world');
        return new Response()
            .status(200)
            .entity(echo)
            .build();
    }

    @GET
    @Path('/json')
    async json() {
        return new Response()
            .status(200)
            .set('Content-Type', 'application/json')
            .entity(JSON.stringify({
                message: 'hello world',
            }))
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestGetController);
app.use(router.routes());
let server;
describe('GET test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should echo string', function (done)  {
        request(server)
            .get('/get/basic')
            .expect('hello world')
            .expect(200, done);
    });
    it('should echo back string in query', function (done) {
        request(server)
            .get('/get/query?echo=hello world')
            .expect('hello world')
            .expect(200, done);
    });
    it('should echo back string in path', function (done) {
        request(server)
            .get('/get/path/hello world')
            .expect('hello%20world')
            .expect(200, done);
    });
    it('should echo back string in header', function (done) {
        request(server)
            .get('/get/header')
            .set('echo', 'hello world')
            .expect('hello world')
            .expect(200, done);
    });
    it('should receive json', function (done) {
        request(server)
            .get('/get/json')
            .expect({
                message: 'hello world',
            })
            .expect(200, done);
    })
})
