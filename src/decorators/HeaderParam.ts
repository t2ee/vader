import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function HeaderParam(name: string) {
    return Contexted((request: Request) => request.headers.get(name));
}

export default HeaderParam;
