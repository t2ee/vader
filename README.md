<p align="center">
    <a href="https://t2ee.org">
        <img width="200" src="https://t2ee.org/img/logos/t2ee.png">
    </a>
</p>
<p align="center">
    <a href="https://vader.t2ee.org">
        <img width="200" src="https://t2ee.org/img/logos/vader.png">
    </a>
</p>


<p align="center">
    <a href="https://www.npmjs.com/package/@t2ee/vader">
        <img src="https://badge.fury.io/js/%40t2ee%2Fvader.svg">
    </a>
    <a href="https://travis-ci.org/t2ee/vader">
        <img src="https://img.shields.io/travis/t2ee/vader/master.svg?style=flat-square">
    </a>
    <a href="https://coveralls.io/r/t2ee/vader?branch=master">
        <img src="https://img.shields.io/coveralls/t2ee/vader/master.svg?style=flat-square">
    </a>
</p>

# IMPORTANT !!

`@t2ee/vader` has now moved towards `1.x` versions, with brand new mechanisms (though, 99% like apis as `0.x` versions). For legacy `0.x` versions, please see [0.x branch](https://github.com/t2ee/vader/tree/0.x).

# Introduction

@t2ee/vader is a routing component (with JAX-RS like grammars). It is to be used with [koa@2](https://github.com/koajs/koa).

For detailed introduction and examples, please visit [vader.t2ee.org](//vader.t2ee.org)

# Installation

`npm i reflect-metadata @t2ee/core @t2ee/sl4js koa@2 @t2ee/vader -S`



# Example

```typescript
import 'reflect-metadata';
import * as Koa from 'koa';
import {
    Path,
    Router,
    QueryParam,
    Response,
    GET,
} from '@t2ee/vader';

const router = Router.newInstance();

@Path('')
class Controller {

    @GET
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

