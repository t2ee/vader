import RouteProperty from  '../core/RouteProperty';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
import Property from '../enums/Property';
const CLASS = Property.CLASS;
const debug = Debugger('vader:decorator');

export default function Path(path: string) {
    return (target, key?: string) => {
        if (key)    {
            debug(`Mounting @Path('${path}') on method '${key}'`);
            target[CLASS] = target[CLASS] || new ControllerProperty();
            target[CLASS].ROUTES[key].PATHS.push(path);
        } else {
            debug(`Mounting @Path('${path}')`);
            target.prototype[CLASS] = target.prototype[CLASS] || new ControllerProperty();
            target.prototype[CLASS].PATH = path;
        }
    }
}
