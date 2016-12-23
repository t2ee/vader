import {
    GET,
    QueryParam,
    Path,
    Response,
    Router,
    ControllerProperty,
    decorate,
} from '../dist';
import * as chai from 'chai';
import * as request from 'supertest';
import * as Koa from 'koa';

function Inject(property) {
    return (target, key?: string, index?: number) => {
        property.PARAMS.push({
            key,
            paramType: 'Inject',
            paramKey: 'test',
        });
    }
}

@Path('')
class TestProvideController {
    @QueryParam()
    query;

    @decorate(Inject)
    testParam: string;

    @GET
    @Path('/basic')
    async basic() {
        chai.assert.equal(this.testParam, 'test');
        return new Response()
            .status(200)
            .build();
    }
}

const app = new Koa();
const router = new Router();
router.provide('Inject', async (parameter, context) => {
    return parameter.paramKey;
});
router.use(TestProvideController);
app.use(router.routes());
let server;
describe('provide test', () => {
    before(() => {
        server = app.listen(3000)
    })
    after(() => {
        server.close();
    })
    it('should succeed', function (done)  {
        request(server)
            .get('/basic')
            .expect(200, done);
    });
})
