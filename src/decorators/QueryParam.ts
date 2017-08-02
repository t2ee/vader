import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function QueryParam(name: string) {
    return Contexted((request: Request) => request.query.get(name));
}

export default QueryParam;
