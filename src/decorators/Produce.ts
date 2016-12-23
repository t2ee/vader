import RouteProperty from  '../core/RouteProperty';
import MediaType from  '../enums/MediaType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import 'reflect-metadata';


export default function Produce(type: MediaType) {
    return (target, key: string) => {
        const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
        debug(`Mounting @Produce(${MediaType.toString(type)})`);
        property.ROUTES[key].PRODUCE = type;
        Reflect.defineMetadata('vader:controller:property', property, target);
    }
}
