import RouteProperty from  '../core/RouteProperty';
import MediaType from  '../enums/MediaType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import * as Metadata from '../utils/Metadata';

export default function Produce(type: MediaType) {
    return (target: any, key: string) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        debug(`Mounting @Produce(${MediaType.toString(type)})`);
        property.ROUTES[key as any].PRODUCE = type;
        Metadata.set('vader:controller:property', property, target);
    }
}
