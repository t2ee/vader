import {
    POST,
    Path,
    BodyParam,
    Consume,
    Produce,
    MediaType,
    Response,
    Router,
} from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
import 'reflect-metadata';

@Path('/post')
class TestPostController {
    @BodyParam()
    body;

    @POST
    @Consume(MediaType.JSON)
    @Path('/json')
    async json(
        @BodyParam() body,
        @BodyParam('message') message
    ) {
        chai.assert.equal(this.body.message, 'hello world');
        chai.assert.equal(body.message, 'hello world');
        chai.assert.equal(message, 'hello world');
        return new Response()
            .status(200)
            .build();
    }

    @POST
    @Consume(MediaType.FORM)
    @Path('/form')
    async form(
        @BodyParam() body
    ) {
        chai.assert.equal(this.body.message, 'hello world');
        chai.assert.equal(body.message, 'hello world');
        return new Response()
            .status(200)
            .build();
    }

    @POST
    @Consume(MediaType.TEXT)
    @Path('/text')
    async text(
        @BodyParam() body
    ) {
        chai.assert.equal(this.body, 'hello world');
        chai.assert.equal(body, 'hello world');
        return new Response()
            .status(200)
            .build();
    }

    @POST
    @Consume(MediaType.MULTIPART)
    @Path('/multi')
    async multi(
        @BodyParam() body
    ) {
        chai.assert.equal(this.body.message, 'hello');
        chai.assert.equal(body.message, 'hello');
        chai.assert.equal(this.body.message2, 'world');
        chai.assert.equal(body.message2, 'world');
        return new Response()
            .status(200)
            .build();
    }

}

const app = new Koa();
const router = new Router();
router.use(TestPostController);
app.use(router.routes());
let server;
describe('POST test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should receive json', function (done)  {
        request(server)
            .post('/post/json')
            .type('json')
            .send({
                message: 'hello world',
            })
            .expect(200, done);
    });
    it('should receive form', function (done)  {
        request(server)
            .post('/post/form')
            .type('form')
            .send({
                message: 'hello world',
            })
            .expect(200, done);
    });
    it('should receive text', function (done)  {
        request(server)
            .post('/post/text')
            .type('text')
            .send('hello world')
            .expect(200, done);
    });

    it('should receive multi form', function (done)  {
        request(server)
            .post('/post/multi')
            .field('message', 'hello')
            .field('message2', 'world')
            .expect(200, done);
    });
})
