import 'source-map-support/register';
import 'app-module-path/register';
/*
import Path from 'decorators/Path';
import GET from 'decorators/GET';
import Router from 'core/Router';
import * as Koa from 'koa';
import Response from 'core/Response';

@Path('/test')
class Test {
    @Path('/a')
    @GET
    async a() {
        console.log('fuck')
        return new Response()
            .status(200)
            .entity('hello world')
            .build();
    }
}

const router = new Router();
router.use(Test);

const app = new Koa();
app.use(router.routes());
app.listen(8998);
*/
