/// <reference types="koa" />
import * as Koa from 'koa';
import IParameter from '../core/IParameter';
import VaderContext from '../core/VaderContext';
declare class Router {
    private _routes;
    private findMatchedRoute(ctx);
    private getBody(route, ctx);
    getParameterValue(parameter: IParameter, context: VaderContext): any;
    getParameter(parameter: IParameter, context: VaderContext): any;
    routes(): (ctx: Koa.Context, next: () => Promise<any>) => Promise<void>;
    use<T>(controllerClass: new (...args) => T): void;
}
export default Router;
