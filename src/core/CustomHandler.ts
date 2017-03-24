import Response from './Response';

abstract class CustomHandler {
    // tslint:disable-next-line
    abstract exceptionCaught(error: Error, ...contextParams: any[]): Response;
}

export default CustomHandler;
