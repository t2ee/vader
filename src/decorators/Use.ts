import RouteProperty from  '../core/RouteProperty';
import IMiddleware from  '../core/IMiddleware';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import 'reflect-metadata';


export default function Use(func: IMiddleware) {
    return (target, key?: string) => {
        if (key) {
            const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
            debug(`Mounting @Use(${func}) on method '${key}'`);
            property.ROUTES[key].WARES.push(func);
            Reflect.defineMetadata('vader:controller:property', property, target);
        } else {
            debug(`Mounting @Use(${func})`);
            const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target.prototype) || new ControllerProperty();
            property.WARES.push(func);
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
    }
}
