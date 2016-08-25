import Param from 'decorators/Param';
import ParamType from 'enums/ParamType';

export default function BodyParam(paramKey?: string) {
    return Param(ParamType.BodyParam);
}
