import 'source-map-support/register';
import 'app-module-path/register';
import Path from  './decorators/Path';
import GET from  './decorators/GET';
import Consume from  './decorators/Consume';
import MediaType from  './enums/MediaType';
import BodyParam from  './decorators/BodyParam';
import Router from  './core/Router';
import * as Koa from 'koa';
import Response from  './core/Response';
import Context from  './decorators/Context';
import Inject from  './decorators/Inject';

async function middleware1(context, next) {
    console.log('1',context['counter']);
    context['counter'] = 1;
    await next();
    console.log('1', context['counter']);
}
async function middleware2(context, next) {
    console.log('2',context['counter']);
    context['counter']++;
    await next();
    console.log('2',context['counter']);
    context['counter']++;
}

@Inject(middleware1)
@Inject(middleware2)
@Path('/inject')
class Test {
    @GET
    @Path('')
    async basic(
        @Context() context) {
        console.log('in',context['counter']);
        context['counter']++;
        return new Response()
            .status(200)
            .build();
    }
}

const router = new Router();
router.use(Test);

const app = new Koa();
app.use(router.routes());
app.listen(8998);
console.log('on')
