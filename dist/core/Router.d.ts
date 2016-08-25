/// <reference types="koa" />
import * as Koa from 'koa';
import IParameter from  '../core/IParameter';
import VaderContext from  '../core/VaderContext';
declare class Router {
    private _routes;
    private findMatchedRoute(koaContext);
    private getBody(route, koaContext);
    getIParameterValue(parameter: IParameter, context: VaderContext): any;
    getIParameter(parameter: IParameter, context: VaderContext): any;
    routes(): (koaContext: Koa.Context, next: Function) => Promise<void>;
    use<T>(controllerClass: new (...args) => T): void;
}
export default Router;
