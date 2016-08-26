import ParamType from '../enums/ParamType';
interface IParameter {
    type: any;
    paramType: ParamType;
    paramKey?: string;
}
export default IParameter;
