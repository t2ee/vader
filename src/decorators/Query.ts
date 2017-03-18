import Param from '../core/decorators/Param';
import Request from '../core/Request';

function Query(target: any, key: string, index?: number): any {
    return Param((request: Request) => request.query)(target, key, index);
}

export default Query;
