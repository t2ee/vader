import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');

export default function Method(method: string) {
    return (target, key: string) => {
        debug(`Mounting @Method(${method})`);
        const property: ControllerProperty =
            Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
        property.ROUTES[key].METHOD = method;
        Reflect.defineMetadata('vader:controller:property', property, target);
    }
}
