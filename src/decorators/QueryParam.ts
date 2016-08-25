import Param from 'decorators/Param';
import ParamType from 'enums/ParamType';

export default function QueryParam(paramKey?: string) {
    return Param(ParamType.QueryParam);
}
