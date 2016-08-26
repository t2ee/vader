import Symbol from  '../enums/Symbol';
import ControllerProperty from  '../core/ControllerProperty';
import RouteProperty from  '../core/RouteProperty';
import MediaType from  '../enums/MediaType';
import * as Debugger from 'debug';
const debug = Debugger('decorator');

const Property = Symbol.Property;

export default function Consume(type: MediaType) {
    return (target, key: string) => {
        debug(`Mounting @Consume(${MediaType.toString(type)})`);
        target[Property] = target[Property] || new ControllerProperty();
        target[Property].routes[key] = target[Property].routes[key] ||
                                new RouteProperty();
        target[Property].routes[key].consume = type;
    }
}
