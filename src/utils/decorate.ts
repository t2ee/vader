import ControllerProperty from '../core/ControllerProperty';
import Property from '../enums/Property';
const CLASS = Property.CLASS;

export default function decorate(func: (property: ControllerProperty) => (target, key?: string, index?: number) => void) {
    return (target, key?: string, index?: number) => {
        let property;
        if (key) {
            property = target[CLASS] || new ControllerProperty();
        } else {
            property = target.prototype[CLASS] || new ControllerProperty();
        }
        const ret = func(property)(target, key, index);
        if (key) {
            target[CLASS] = property;
        } else {
            target.prototype[CLASS] = property;
        }
        return ret;
    }
}
