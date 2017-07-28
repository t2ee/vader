import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function Body(target: any, key: string, index?: number): any {
    return Contexted((request: Request) => request.body)(target, key, index);
}

export default Body;
