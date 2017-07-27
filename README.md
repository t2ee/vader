[![Node version][node-image]][npm-url]
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

## Announcement

`v1.0` is in alpha state, feel free to give it a try: [branch v1.0](https://github.com/t2ee/vader/tree/v1.0)

## Installation

```
$ npm install koa@next @types/koa @t2ee/vader --save
```

## Introduction

This is the core component of t2ee, the routing service.

## Caution
Bring your own 'reflect-metadata'


## Example

```typescript
import 'reflect-metadata';

@Path('/')
class TestController {

    @GET
    @Produce(MediaType.JSON)
    @Path('/')
    async index() {
        return new Response()
            .status(200)
            .entity({
                message: 'hello world',
            })
            .build();
    }
}
const app = new Koa();
const router = new Router();
router.use(TestController);
app.use(router.routes());
app.listen(8080);
```

##API
### Router
#### provide(providerName: string, fn: (parameter: IParameter, context: VaderContext) => Promise);
> provide custom annotations that can be managed by vader.

#### use(controller: Class)
> register a controller to router

#### routes()
> return a middleware function to be used in Koa.

### Response
#### entity(body: any)
> set content

#### status(status: number)
> set status

#### set(key: string, value: string)
> set header

#### build()
> build response before return

### VaderContext
* headers
* params
* query
* body
* http: Koa.Context
* [key: string]: any // used to store any intermediate state.

### @BodyParam(key?: string)
> used to get body of item of specified key

### @HeaderParam(key?: string)
> used to get header of item of specified key

### @PathParam(key?: string)
> used to get path variables of item of specified key

### @QueryParam(key?: string)
> used to get query of item of specified key

### @Consume(type: MediaType)
> set reqeust body content type

### @Produce(type: MediaType)
> set response body content type

### @DELETE
### @GET
### @POST
### @PUT
### @HEAD
### @OPTIONS
### @Method(method:  string)
> set reqeust method

### @Context
> get current VaderContext

### @Use(func:  (context: VaderContext, next: () => Promise<void>) => Promise<void>)
> plug in custom middleware

### Charset
> charset enums

### HttpMethod
> http method enums

### MediaType
> content type enums

### Status
> http status enums




## Contributing

PRs and Issues are welcome



[npm-image]: https://img.shields.io/npm/v/@t2ee/vader.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@t2ee/vader
[node-image]: https://img.shields.io/node/v/@t2ee/vader.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/t2ee/vader/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/t2ee/vader
[coveralls-image]: https://img.shields.io/coveralls/t2ee/vader/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/t2ee/vader?branch=master
