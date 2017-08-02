import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function PathParam(name: string) {
    return Contexted((request: Request) => request.params.get(name));
}

export default PathParam;
