import Response from '../core/Response';
import Request from '../core/Request';
import Handler from './Handler';

interface NotFoundHandler extends Handler<void> {
    handle(req: Request, data: void): Promise<Response>;
}

export default NotFoundHandler;
