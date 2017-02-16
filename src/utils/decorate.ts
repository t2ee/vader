import ControllerProperty from '../core/ControllerProperty';
import * as Metadata from '../utils/Metadata';

export default function decorate(func: (property: ControllerProperty) => (target: any, key?: string, index?: number) => void) {
    return (target: any, key?: string, index?: number) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        const ret = func(property)(target, key, index);
        Metadata.set('vader:controller:property', property, target);
        return ret;
    }
}
