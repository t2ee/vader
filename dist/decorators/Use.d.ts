import IMiddleware from '../core/IMiddleware';
import 'reflect-metadata';
export default function Use(func: IMiddleware): (target: any, key?: string) => void;
