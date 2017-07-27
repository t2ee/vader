import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function Headers(target: any, key: string, index?: number): any {
    return Contexted((request: Request) => request.headers)(target, key, index);
}

export default Headers;
