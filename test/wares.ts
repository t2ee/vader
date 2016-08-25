import * as tsRouter from '../src';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';

@tsRouter.Path('/test')
@tsRouter.Inject(async (context, next) => {
    console.log('1before')
    await next();
    console.log('1after')
})
class TestController {
    @tsRouter.Path('/:v1/:v2')
    @tsRouter.GET
    @tsRouter.Produce(tsRouter.MediaType.JSON)
    @tsRouter.Inject(async (context, next) => {
        console.log('0before')
        await next();
        console.log('0after')
    })
    async index(
        @tsRouter.Params params: Object,
        @tsRouter.PathParam('v1') v1: string,
        @tsRouter.PathParam('v2') v2: string
    ):Promise<tsRouter.Response> {
        console.log('yes')
        return tsRouter.Response.status(200).body({v1, v2, params}).build();
    }
}

const app = new Koa();
const router = new tsRouter.Router();
router.use(TestController);
app.use(router.routes());
let server;
server = app.listen(3000)
request(server)
    .get('/test/hello/world')
    .expect('Content-Type', 'application/json')
    .expect({
        params: {
            v1: 'hello',
            v2: 'world'
        },
        v1: 'hello',
        v2: 'world',
        v3: 'helloworld'
    })
    .expect(200, () => {});
/*
describe('GET with path paramters with afterwares', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should respond paramters in back in json', function (done)  {
        request(server)
            .get('/test/hello/world')
            .expect('Content-Type', 'application/json')
            .expect({
                params: {
                    v1: 'hello',
                    v2: 'world'
                },
                v1: 'hello',
                v2: 'world',
                v3: 'helloworld'
            })
            .expect(200, done);
    });
})

*/
