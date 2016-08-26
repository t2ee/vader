import Param from  '../decorators/Param';
import ParamType from  '../enums/ParamType';

export default function Context(paramKey?: string) {
    return Param(ParamType.Context);
}
