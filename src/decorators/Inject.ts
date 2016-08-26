import Symbol from  '../enums/Symbol';
import ControllerProperty from  '../core/ControllerProperty';
import RouteProperty from  '../core/RouteProperty';
import IMiddleware from  '../core/IMiddleware';
import * as Debugger from 'debug';
const debug = Debugger('decorator');

const Property = Symbol.Property;

export default function Inject(func: IMiddleware) {
    return (target, key?: string) => {
        if (key) {
            debug(`Mounting @Inject(${func}) on method '${key}'`);
            target[Property] = target[Property] || new ControllerProperty();
            target[Property].routes[key] =
                                    target[Property].routes[key] ||
                                    new RouteProperty();
            target[Property].routes[key].wares.push(func);
        } else {
            debug(`Mounting @Inject(${func})`);
            target.prototype[Property] = target.prototype[Property] || new RouteProperty();
            target.prototype[Property].wares.push(func);
        }
    }
}
