import Response from './Response';
import Request from './Request';

abstract class CustomHandler {
    // tslint:disable-next-line
    abstract async exceptionCaught(error: Error, ...contextParams: any[]): Promise<Response>;

    // tslint:disable-next-line
    abstract async notFound(req: Request, ...contextParams: any[]): Promise<Response>;
}

export default CustomHandler;
