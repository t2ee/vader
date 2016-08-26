import * as vader from '../src';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
const {
    OPTIONS,
    Path,
} = vader.decorators;
const {
    Response,
    Router,
} = vader.core;

@Path('/options')
class TestOptionsController {
    @OPTIONS
    @Path('/basic')
    async basic() {
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestOptionsController);
app.use(router.routes());
let server;
describe('OPTIONS test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .options('/options/basic')
            .expect(200, done);
    });
})
