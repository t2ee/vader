import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
import Property from '../enums/Property';
const CLASS = Property.CLASS;
const debug = Debugger('vader:decorator');

export default function Method(method: string) {
    return (target, key: string) => {
        debug(`Mounting @Method(${method})`);
        target[CLASS] = target[CLASS] || new ControllerProperty();
        target[CLASS].ROUTES[key].METHOD = method;
    }
}
