import RouteProperty from  '../core/RouteProperty';
import ParamType from  '../enums/ParamType';
import Debugger from '../utils/debug';
import 'reflect-metadata';
import ControllerProperty from '../core/ControllerProperty';
import Property from '../enums/Property';
const CLASS = Property.CLASS;
const debug = Debugger('vader:decorator');

export default function Param(paramType: ParamType, paramKey?: string) {
    return (target, key?: string, index?: number) => {
        if (index !== undefined) {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            target[CLASS] = target[CLASS] || new ControllerProperty();
            target[CLASS].ROUTES[key].PARAMS[index] = {
                type,
                paramKey,
                paramType,
                key,
            };
        } else {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on ${key}`);
            let type = Reflect.getMetadata('design:type', target, key);
            target[CLASS] = target[CLASS] || new ControllerProperty();
            target[CLASS].PARAMS.push({
                type,
                paramKey,
                paramType,
                key,
            });
        }
    };
}
