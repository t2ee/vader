import ControllerProperty from '../core/ControllerProperty';
import 'reflect-metadata';


export default function decorate(func: (property: ControllerProperty) => (target, key?: string, index?: number) => void) {
    return (target, key?: string, index?: number) => {
        let property: ControllerProperty;
        if (key) {
            property = Reflect.getMetadata('vader:controller:property', target);
        } else {
            property =  Reflect.getMetadata('vader:controller:property', target.prototype);
        }
        property = property || new ControllerProperty();
        const ret = func(property)(target, key, index);
        if (key) {
            Reflect.defineMetadata('vader:controller:property', property, target);
        } else {
            Reflect.defineMetadata('vader:controller:property', property, target.prototype);
        }
        return ret;
    }
}
