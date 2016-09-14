import * as vader from '../src';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
const {
    GET,
    Path,
    Use,
    Context,
} = vader.decorators;

const {
    VaderContext,
    Response,
    Router,
} = vader.core;

let counter = 0;

async function middleware1(context, next) {
    chai.assert.isOk(context['counter'] === undefined);
    context['counter'] = 1;
    await next();
    chai.assert.isOk(context['counter'] === 8);
    counter = context['counter'];
}
async function middleware2(context, next) {
    chai.assert.isOk(context['counter'] === 1);
    context['counter']++;
    await next();
    chai.assert.isOk(context['counter'] === 7);
    context['counter']++;
}
async function middleware3(context, next) {
    chai.assert.isOk(context['counter'] === 2);
    context['counter']++;
    await next();
    chai.assert.isOk(context['counter'] === 6);
    context['counter']++;
}
async function middleware4(context, next) {
    chai.assert.isOk(context['counter'] === 3);
    context['counter']++;
    await next();
    chai.assert.isOk(context['counter'] === 5);
    context['counter']++;
    context.http.set('X-Custom', 'hello');
}

@Use(middleware1)
@Use(middleware2)
@Path('/inject')
class TestController {
    @GET
    @Path('')
    @Use(middleware3)
    @Use(middleware4)
    async basic(
        @Context() context) {
        chai.assert.isOk(context['counter'] === 4);
        context['counter']++;
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestController);
app.use(router.routes());
let server;
describe('@Use test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .get('/inject')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                chai.assert.isOk(res.header['x-custom'] === 'hello');
                chai.assert.isOk(counter === 8);
                done();
            });
    });
})
