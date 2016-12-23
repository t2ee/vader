import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import * as Metadata from '../utils/Metadata';

export default function Method(method: string) {
    return (target, key: string) => {
        debug(`Mounting @Method(${method})`);
        const property: ControllerProperty =
            Metadata.get('vader:controller:property', target) || new ControllerProperty();
        property.ROUTES[key].METHOD = method;
        Metadata.set('vader:controller:property', property, target);
    }
}
