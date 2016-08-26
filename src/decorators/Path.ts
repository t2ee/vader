import Symbol from  '../enums/Symbol';
import ControllerProperty from  '../core/ControllerProperty';
import RouteProperty from  '../core/RouteProperty';
import * as Debugger from 'debug';
const debug = Debugger('decorator');

const Property = Symbol.Property;

export default function Path(path: string) {
    return (target, key?: string) => {
        if (key) {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            target[Property] = target[Property] || new ControllerProperty();
            target[Property] = target[Property] || new ControllerProperty();
            target[Property].routes[key] = target[Property].routes[key] ||
                                    new RouteProperty();
            target[Property].routes[key].paths.push(path);
        } else {
            debug(`Mounting @Path('${path}')`);
            target.prototype[Property] = target.prototype[Property] || new ControllerProperty();
            target.prototype[Property].path = path;
        }
    }
}
