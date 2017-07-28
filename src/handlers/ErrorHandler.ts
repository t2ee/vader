import Response from '../core/Response';
import Request from '../core/Request';
import Handler from './Handler';

interface ErrorHandler extends Handler<Error> {
    handle(req: Request, error: Error): Promise<Response>;
}

export default ErrorHandler;
