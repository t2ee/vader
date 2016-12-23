import {
    HEAD,
    Path,
    Response,
    Router,
} from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
import 'reflect-metadata';


@Path('/head')
class TestHeadController {
    @HEAD
    @Path('/basic')
    async basic() {
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestHeadController);
app.use(router.routes());
let server;
describe('HEAD test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .head('/head/basic')
            .expect(200, done);
    });
})
