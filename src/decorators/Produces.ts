import After from '../core/decorators/After';
import AfterMiddleware from '../core/AfterMiddleware';
import Response from '../core/Response';

function ProducesFunction(type: string): AfterMiddleware {
    return async (res: Response): Promise<Response> => {
        res.headers.set('Content-Type', type);

        return res;
    };
}

function Produces(type: string):
    (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => any {
    return After(ProducesFunction(type));
}

export default Produces;
