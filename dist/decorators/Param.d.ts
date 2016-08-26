import ParamType from '../enums/ParamType';
import 'reflect-metadata';
export default function Param(paramType: ParamType, paramKey?: string): (target: any, key?: string, index?: number) => void;
