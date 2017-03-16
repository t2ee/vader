import Request from './Request';

type ParamHook = (request: Request, key?: string) => any;

export default ParamHook;