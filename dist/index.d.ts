/// <reference types="koa" />
import 'app-module-path/register';
import * as Koa from 'koa';
import IMiddleware from './core/IMiddleware';
import core_AbstractMiddleware from './core/AbstractMiddleware';
import core_ControllerProperty from './core/ControllerProperty';
import core_Response from './core/Response';
import core_RouteProperty from './core/RouteProperty';
import core_Router from './core/Router';
import core_VaderContext from './core/VaderContext';
export declare const core: {
    AbstractMiddleware: typeof core_AbstractMiddleware;
    ControllerProperty: typeof core_ControllerProperty;
    Response: typeof core_Response;
    RouteProperty: typeof core_RouteProperty;
    Router: typeof core_Router;
    VaderContext: typeof core_VaderContext;
};
export declare const decorators: {
    BodyParam: (paramKey?: string) => (target: any, key?: string, index?: number) => void;
    Consume: (type: enums_MediaType) => (target: any, key: string) => void;
    Context: (paramKey?: string) => (target: any, key?: string, index?: number) => void;
    DELETE: (target: any, key: string) => void;
    GET: (target: any, key: string) => void;
    HEAD: (target: any, key: string) => void;
    HeaderParam: (paramKey?: string) => (target: any, key?: string, index?: number) => void;
    Method: (method: string) => (target: any, key: string) => void;
    OPTIONS: (target: any, key: string) => void;
    POST: (target: any, key: string) => void;
    PUT: (target: any, key: string) => void;
    Param: (paramType: enums_ParamType, paramKey?: string) => (target: any, key?: string, index?: number) => void;
    Path: (path: string) => (target: any, key?: string) => void;
    PathParam: (paramKey?: string) => (target: any, key?: string, index?: number) => void;
    Produce: (type: enums_MediaType) => (target: any, key: string) => void;
    QueryParam: (paramKey?: string) => (target: any, key?: string, index?: number) => void;
    Use: (func: IMiddleware) => (target: any, key?: string) => void;
};
import enums_Charset from './enums/Charset';
import enums_HttpMethod from './enums/HttpMethod';
import enums_MediaType from './enums/MediaType';
import enums_ParamType from './enums/ParamType';
import enums_Property from './enums/Property';
import enums_Status from './enums/Status';
export declare const enums: {
    Charset: typeof enums_Charset;
    HttpMethod: typeof enums_HttpMethod;
    MediaType: typeof enums_MediaType;
    ParamType: typeof enums_ParamType;
    Property: typeof enums_Property;
    Status: typeof enums_Status;
};
export declare const utils: {
    createArray: <T>(type: new () => T) => T[];
    debug: (name: any) => any;
    decorate: (func: (property: core_ControllerProperty) => (target: any, key?: string, index?: number) => void) => (target: any, key?: string, index?: number) => void;
    parseMulti: (koaContext: Koa.Context, opts?: any) => Promise<any>;
};
