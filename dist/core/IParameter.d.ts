import ParamType from '../enums/ParamType';
interface IParameter {
    type: any;
    paramType: ParamType | string;
    paramKey?: string;
    key: string;
}
export default IParameter;
