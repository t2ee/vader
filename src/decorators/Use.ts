import RouteProperty from  '../core/RouteProperty';
import IMiddleware from  '../core/IMiddleware';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import * as Metadata from '../utils/Metadata';

export default function Use(func: IMiddleware) {
    return (target, key?: string) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        if (key) {
            debug(`Mounting @Use(${func}) on method '${key}'`);
            property.ROUTES[key].WARES.push(func);
        } else {
            debug(`Mounting @Use(${func})`);
            property.WARES.push(func);
        }
        Metadata.set('vader:controller:property', property, target);
    }
}
