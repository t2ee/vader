import Param from '../core/decorators/Param';
import Request from '../core/Request';

function Body(target: any, key: string, index?: number): any {
    return Param((request: Request) => request.body)(target, key, index);
}

export default Body;
