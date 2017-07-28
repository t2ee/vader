import Response from '../core/Response';
import Request from '../core/Request';

interface Handler<T> {
    handle(req: Request, data: T): Promise<Response>;
}

export default Handler;
