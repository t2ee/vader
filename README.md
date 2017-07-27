# Introducation
Starting `v1.0`, `t2ee/vader` now uses [@t2ee/core](https://github.com/t2ee/core) to manage all dependency injections

You should install `reflect-metadata` and import it in your top level file (bring your own `reflect-metadata`).

# Example

```typescript
import {
    Router,
    GET,
    Response,
    Path,
    QueryParam,
} from '@t2ee/vader';
import Koa from 'koa';
const router = Router.newInstance();

@Path('/')
@Component
class Controller {
    @Path('/say')
    say(@QueryParam('message') message: string) {
        const response = new Response();
        response.body = message;
        return response;
    }
}

router.use(Controller);
const app = new Koa();
app.use(router.routes());
app.listen(8080);
```

# API

## Router

### Router::routes()

> returns a middleware to be used by koa

### Router::use(BeforeMiddleware[], AfterMiddleware[]?, AfterAllMiddleware[]?)
### Router::use(ClassConstructor<any>, BeforeMiddleware[]?, AfterMiddleware[]?, AfterAllMiddleware[]?)

> register controller class, with/without middlewares


### Router::provideContext<T>(ClassConstructor<any>, (Request) => <T>)

> provide custom context class to be resolved on a per-request basis.

`example`
```typescript
@Component
class Controller {
    @Context user: User
}
router.provideContext(User, (req: Request) => req.extra.get('app-user')); // you get modify request in beforeMiddlewares.
```

## Decorators

### @Body, @Headers, @Query, @PathParams

bind request body, headers, query, params

`example`
```typescript
class Controller {
    @Body body

    @POST
    @Path('/say/:hello')
    postRequest(@Body body, @PathParams params) {
    }
}
```


### @HeaderParam(string), @PathParam(string), @QueryParam(string)

bind request header, path, query by key

### @DELETE, @GET, @PUT, @POST, @PATCH

http methods, used on methods;

### @Consumes(MediaType)

parse body according to media type

### @Context

use to bind contexted classes

### @Contexted(ContextHook, string?)

use custom provider to provde contexted classes

### @Path

use to set path, (classes and methods)

### @After, @Before, @AfterAll

used on methods, to inject middlewares with current context information





