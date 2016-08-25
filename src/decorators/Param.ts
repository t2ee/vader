import Symbol from 'enums/Symbol';
import ControllerProperty from 'core/ControllerProperty';
import RouteProperty from 'core/RouteProperty';
import ParamType from 'enums/ParamType';
import * as Debugger from 'debug';
import 'reflect-metadata';
const debug = Debugger('decorator');

const Property = Symbol.Property;

export default function Param(paramType: ParamType, paramKey?: string) {
    return (target, key?: string, index?: number) => {
        target[Property] = target[Property] || new ControllerProperty();
        if (index) {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey}')} on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            target[Property].routes[key] = target[Property].routes[key] ||
                                    new RouteProperty();
            target[Property].routes[key].params[index] = {
                type,
                paramKey,
                paramType,
            };
        } else {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey}')}`);
            let type = Reflect.getMetadata('design:type', target, key);
            target[Property].params[key] = {
                type,
                paramKey,
                paramType,
            };
        }
    };
}
