import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import * as Metadata from '../utils/Metadata';

export default function Path(path: string) {
    return (target: any, key?: string) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        if (key)    {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            property.ROUTES[key as any].PATHS.push(path);
        } else {
            debug(`Mounting @Path('${path}')`);
            property.PATH = path;
        }
        Metadata.set('vader:controller:property', property, target);
    }
}
