import IMiddleware from '../core/IMiddleware';
export default function Inject(func: IMiddleware): (target: any, key?: string) => void;
