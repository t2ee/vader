import RouteProperty from  '../core/RouteProperty';
import MediaType from  '../enums/MediaType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
import 'reflect-metadata';

const debug = Debugger('vader:decorator');

export default function Consume(type: MediaType) {
    return (target, key: string) => {
        const property: ControllerProperty =
                Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
        debug(`Mounting @Consume(${MediaType.toString(type)})`);
        property.ROUTES[key].CONSUME = type;
        Reflect.defineMetadata('vader:controller:property', property, target);
    }
}
