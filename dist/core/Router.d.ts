/// <reference types="koa" />
import * as Koa from 'koa';
import IParameter from '../core/IParameter';
import VaderContext from '../core/VaderContext';
import Response from '../core/Response';
declare class Router {
    private _routes;
    private _providers;
    private _errorHandler;
    private findMatchedRoute(koaContext);
    private getBody(route, koaContext);
    private getParameterValue(parameter, context);
    private getParameter(parameter, context);
    setErrorHandler(handler: (e) => Promise<Response>): void;
    routes(): (koaContext: Koa.Context, next: () => Promise<any>) => Promise<void>;
    provide(name: string, fn: (parameter: IParameter, context: VaderContext) => Promise<any>): void;
    use(controllerClass: new (...args: Array<any>) => any): void;
}
export default Router;
