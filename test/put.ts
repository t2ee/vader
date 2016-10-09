import * as vader from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
const {
    PUT,
    Path,
} = vader.decorators;
const {
    Response,
    Router,
} = vader.core;

@Path('/put')
class TestPutController {
    @PUT
    @Path('/basic')
    async basic() {
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestPutController);
app.use(router.routes());
let server;
describe('PUT test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .put('/put/basic')
            .expect(200, done);
    });
})
