import RouteProperty from  '../core/RouteProperty';
import ParamType from  '../enums/ParamType';
import Debugger from '../utils/debug';
import ControllerProperty from '../core/ControllerProperty';
const debug = Debugger('vader:decorator');
import * as Metadata from '../utils/Metadata';

export default function Param(paramType: ParamType, paramKey?: string) {
    return (target: any, key?: string, index?: number) => {
        const property: ControllerProperty =
                Metadata.get('vader:controller:property', target)|| new ControllerProperty();
        if (index !== undefined) {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on method '${key}', ${index}th parameter`);
            let type = (Reflect as any).getMetadata('design:paramtypes', target, key)[index];
            property.ROUTES[key as any].PARAMS[index] = {
                type,
                paramKey,
                paramType,
                key,
            };
        } else {
            debug(`Mounting @${ParamType.toString(paramType)}('${paramKey || ''}') on ${key}`);
            let type = (Reflect as any).getMetadata('design:type', target, key);
            property.PARAMS.push({
                type,
                paramKey,
                paramType,
                key,
            });
        }
        Metadata.set('vader:controller:property', property, target);
    };
}
