import Param from 'decorators/Param';
import ParamType from 'enums/ParamType';

export default function HeaderParam(paramKey?: string) {
    return Param(ParamType.HeaderParam);
}
