// tslint:disable-next-line
import 'source-map-support/register';

import Router from './Router';
import RouterConfiguration from './RouterConfiguration';
import AfterMiddleware from './core/AfterMiddleware';
import AfterAllMiddleware from './core/AfterAllMiddleware';
import BeforeMiddleware from './core/BeforeMiddleware';
import ContextHook from './core/ContextHook';
import Request from './core/Request';
import Response from './core/Response';
import After from './core/decorators/After';
import AfterAll from './core/decorators/AfterAll';
import Before from './core/decorators/Before';
import Contexted from './core/decorators/Contexted';
import Context from './core/decorators/Context';
import Method from './core/decorators/Method';
import Path from './core/decorators/Path';
import Body from './decorators/Body';
import DELETE from './decorators/DELETE';
import GET from './decorators/GET';
import HeaderParam from './decorators/HeaderParam';
import Headers from './decorators/Headers';
import PATCH from './decorators/PATCH';
import POST from './decorators/POST';
import PUT from './decorators/PUT';
import PathParam from './decorators/PathParam';
import PathParams from './decorators/PathParams';
import Query from './decorators/Query';
import QueryParam from './decorators/QueryParam';
import HttpMethod from './enums/HttpMethod';
import Consumes from './decorators/Consumes';
import Produces from './decorators/Produces';
import ErrorHandler from './handlers/ErrorHandler';
import NotFoundHandler from './handlers/NotFoundHandler';

export {
    Router,
    RouterConfiguration,
    AfterMiddleware,
    AfterAllMiddleware,
    BeforeMiddleware,
    ContextHook,
    Request,
    Response,
    After,
    Before,
    AfterAll,
    Contexted,
    Context,
    Method,
    Path,
    Body,
    DELETE,
    GET,
    HeaderParam,
    Headers,
    PATCH,
    POST,
    PUT,
    PathParam,
    PathParams,
    Query,
    QueryParam,
    HttpMethod,
    Consumes,
    Produces,
    ErrorHandler,
    NotFoundHandler,
};

import {
    Container,
} from '@t2ee/core';
import contextProvider from './core/ContextProvider';

Container.inject(Symbol.for('t2ee:vader:context'), contextProvider);
