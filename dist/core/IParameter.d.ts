import ParamType from '../enums/ParamType';
interface IParameter {
    paramType: ParamType | string;
    paramKey?: string;
    key: string;
    type?: any;
}
export default IParameter;
