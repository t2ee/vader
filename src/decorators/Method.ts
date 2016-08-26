import Symbol from  '../enums/Symbol';
import ControllerProperty from  '../core/ControllerProperty';
import RouteProperty from  '../core/RouteProperty';
import * as Debugger from 'debug';
const debug = Debugger('decorator');

const Property = Symbol.Property;

export default function Method(method: string) {
    return (target, key: string) => {
        debug(`Mounting @Method(${method})`);
        target[Property] = target[Property] || new ControllerProperty();
        target[Property].routes[key] = target[Property].routes[key] ||
                                    new RouteProperty();
        target[Property].routes[key].method = method;
    }
}
