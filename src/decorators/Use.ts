import RouteProperty from  '../core/RouteProperty';
import IMiddleware from  '../core/IMiddleware';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
import Property from '../enums/Property';
const CLASS = Property.CLASS;
const debug = Debugger('vader:decorator');

export default function Use(func: IMiddleware) {
    return (target, key?: string) => {
        if (key) {
            debug(`Mounting @Use(${func}) on method '${key}'`);
            target[CLASS] = target[CLASS] || new ControllerProperty();
            target[CLASS].ROUTES[key].WARES.push(func);
        } else {
            debug(`Mounting @Use(${func})`);
            target.prototype[CLASS] = target.prototype[CLASS] || new ControllerProperty();
            target.prototype[CLASS].WARES.push(func);
        }
    }
}
