import {
    GET,
    Path,
    Router,
    Response,
} from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';
import 'reflect-metadata';

class MyError extends Error {
}

@Path('/error')
class TestErrorController {

    @GET
    @Path('')
    async caught() {
        throw new MyError('test');
    }
}
let server
describe('Error test', () => {
    it('should catch error', function (done)  {
        const app = new Koa();
        const router = new Router();
        router.use(TestErrorController);
        router.setErrorHandler(async (e) => {
            if (e instanceof MyError) {
                return new Response()
                    .status(200)
                    .build();
            }
        })
        app.use(router.routes());
        server = app.listen(3000);

        request(server)
            .get('/error')
            .expect(200, (e) => {
                done();
                server.close();
            });
    });
    it('should not catch error', function (done)  {
        const app = new Koa();
        const router = new Router();
        router.use(TestErrorController);
        app.use(router.routes());
        server = app.listen(3000);

        request(server)
            .get('/error')
            .expect(500, (e) => {
                done();
                server.close();
            });
    });
})
