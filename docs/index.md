<p align="center">
    <a href="//t2ee.org">
        <img width="200" src="//t2ee.org/img/logos/t2ee.png">
    </a>
</p>
<p align="center">
    <a href="//vader.t2ee.org">
        <img width="200" src="//t2ee.org/img/logos/vader.png">
    </a>
</p>

<p align="center">
    <a href="https://travis-ci.org/t2ee/vader">
        <img src="https://img.shields.io/travis/t2ee/vader/master.svg?style=flat-square">
    </a>
    <a href="https://coveralls.io/r/t2ee/vader?branch=master">
        <img src="https://img.shields.io/coveralls/t2ee/vader/master.svg?style=flat-square">
    </a>
</p>

# Introduction

@t2ee/vader is a routing component (with JAX-RS like grammars). It is to be used with [koa@2](https://github.com/koajs/koa).

# Installation

`npm i reflect-metadata @t2ee/core @t2ee/sl4js koa@2 @t2ee/vader -S`

# Usage

## Basic Usage

```typescript
const router = Router.newInstance();

@Path('/')
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

## Receive POST Data

```typescript
@Path('/')
class Controller {

    @POST
    @Consumes('application/json')
    @Path('/login')
    say(@Body body) {
        const response = new Response();
        response.body = body;
        return response;
    }
}
```

## Use Middlewares

Middlewares can be either injected on classes or methods.

### Direct Register Middlewares

```typescript

async function handler(request: Request): Promise<Request> {
    if (request.headers.get('SECRET-KEY') !== 'secret') {
        throw new Error('WRONG!!!!!!');
    }
    return request;
}

@Before(handler)
class Controller {
}
```

### Through Class Methods

```typescript

async function handler(request: Request): Promise<Request> {
    if (request.headers.get('SECRET-KEY') !== 'secret') {
        throw new Error('WRONG!!!!!!');
    }
    return request;
}

@Before('checkSecret')
class Controller {
    async checkSecret(@Context request: Request): Promise<Request> {
        if (request.headers.get('SECRET-KEY') !== 'secret') {
            throw new Error('WRONG!!!!!!');
        }
        return request;
    }
}
```

### Register For All Routes

```typescript
router.userMiddlewares(before, afters, afterAlls);
```

### Custom Context Variables

### Binding directly

Let's say we wanted to bind headers `SECRET-KEY` to a variable.

```typescript

function Secret(target: Object, key: string) {
    return Contexted((req: Request) => req.headers.get('SECRET-KEY'));
}

class Controller {
    @Secret secret: string;
}

```
### Binding by class

```typescript
class User {
    username: string;
    password: string;
}

router.provideContext(User, (req: Request) => {
    const user = new User();
    // fill up user
    return user;
});

class Controller {
    @Context user: User;
}
```

## Handlers

Exceptions and extra configurations are implemented by `Auto Configuration`. To provide a custom handler, see example below.

```typescript
@Configuration
class Config {
    @Bean('NotFoundHandler)
    notFoundHandler(): NotFoundHandler {
        return {
            async handle(req: Request, data: void): Promise<core.Response> {
                // handle unmatched routes here.
            }
        }
    }

    @Bean('ErrorHandler')
    errorHandler(): ErrorHandler {
        return {
            async handle(req: Request, error: Error): Promise<core.Response> {
                // handle uncaught errors here.
            }
        }
    }
}
```

# API

## Coming soon ...

Coming soon...
