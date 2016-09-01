import ParamType from '../enums/ParamType';
export default class Parameter {
    type: any;
    paramType: ParamType | string;
    paramKey?: string;
}
