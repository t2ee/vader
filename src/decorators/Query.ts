import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function Query(target: any, key: string, index?: number): any {
    return Contexted((request: Request) => request.query)(target, key, index);
}

export default Query;
