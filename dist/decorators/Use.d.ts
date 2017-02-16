import IMiddleware from '../core/IMiddleware';
export default function Use(func: IMiddleware): (target: any, key?: string) => void;
