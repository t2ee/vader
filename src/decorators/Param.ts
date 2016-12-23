import RouteProperty from  '../core/RouteProperty';
import ParamType from  '../enums/ParamType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import 'reflect-metadata';


export default function Param(paramType: ParamType, paramKey?: string) {
    return (target, key?: string, index?: number) => {
        const property: ControllerProperty =
            Reflect.getMetadata('vader:controller:property', target) || new ControllerProperty();
        if (index !== undefined) {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on method '${key}', ${index}th parameter`);
            let type = Reflect.getMetadata('design:paramtypes', target, key)[index];
            property.ROUTES[key].PARAMS[index] = {
                type,
                paramKey,
                paramType,
                key,
            };
        } else {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on ${key}`);
            let type = Reflect.getMetadata('design:type', target, key);
            property.PARAMS.push({
                type,
                paramKey,
                paramType,
                key,
            });
        }
        Reflect.defineMetadata('vader:controller:property', property, target);
    };
}
