import RouteProperty from  '../core/RouteProperty';
import MediaType from  '../enums/MediaType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
import * as Metadata from '../utils/Metadata';
const debug = Debugger('vader:decorator');

export default function Consume(type: MediaType) {
    return (target, key: string) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        debug(`Mounting @Consume(${MediaType.toString(type)})`);
        property.ROUTES[key].CONSUME = type;
        Metadata.set('vader:controller:property', property, target);
    }
}
