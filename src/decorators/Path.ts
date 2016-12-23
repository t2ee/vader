import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import 'reflect-metadata';


export default function Path(path: string) {
    return (target, key?: string) => {
        if (key)    {
            const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
            debug(`Mounting @Path('${path}') on method '${key}'`);
            property.ROUTES[key].PATHS.push(path);
            Reflect.defineMetadata('vader:controller:property', property, target);
        } else {
            debug(`Mounting @Path('${path}')`);
            const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target.prototype) || new ControllerProperty();
            property.PATH = path;
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
    }
}
