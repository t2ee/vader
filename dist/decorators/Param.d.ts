import ParamType from '../enums/ParamType';
export default function Param(paramType: ParamType, paramKey?: string): (target: any, key?: string, index?: number) => void;
