import Param from '../core/decorators/Param';
import Request from '../core/Request';

function PathParams(target: any, key: string, index?: number): any {
    return Param((request: Request) => request.params)(target, key, index);
}

export default PathParams;
