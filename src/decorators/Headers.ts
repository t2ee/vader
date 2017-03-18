import Param from '../core/decorators/Param';
import Request from '../core/Request';

function Headers(target: any, key: string, index?: number): any {
    return Param((request: Request) => request.headers)(target, key, index);
}

export default Headers;
