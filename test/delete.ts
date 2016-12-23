import {
    DELETE,
    Path,
    Response,
    Router,
} from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
import 'reflect-metadata';

@Path('/delete')
class TestDeleteController {
    @DELETE
    @Path('/basic')
    async basic() {
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.use(TestDeleteController);
app.use(router.routes());
let server;
describe('DELETE test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .del('/delete/basic')
            .expect(200, done);
    });
})
