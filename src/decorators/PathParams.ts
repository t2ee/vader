import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function PathParams(target: any, key: string, index?: number): any {
    return Contexted((request: Request) => request.params)(target, key, index);
}

export default PathParams;
