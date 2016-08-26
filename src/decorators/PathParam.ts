import Param from  '../decorators/Param';
import ParamType from  '../enums/ParamType';

export default function PathParam(paramKey?: string) {
    return Param(ParamType.PathParam, paramKey);
}
