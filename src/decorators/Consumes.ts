import Before from '../core/decorators/Before';
import BeforeMiddleware from '../core/BeforeMiddleware';
import Request from '../core/Request';
import * as parse from 'co-body';

function ConsumesFunction(type: string, limit?: string): BeforeMiddleware {
    return async (req: Request): Promise<Request> => {
        const options: parse.Options = {
            limit,
        };

        if (req.headers.get('content-type') === type) {
            switch (type) {
                case 'application/json':
                    req.body = await parse.json(req.context, options);
                    break;
                case 'application/x-www-form-urlencoded':
                    req.body = await parse.form(req.context, options);
                    break;
                case 'text/plain':
                    req.body = await parse.text(req.context, options);
                    break;
                default:
                    req.body = await parse(req.context, options);
                    break;
            }
        }

        return req;
    };
}

function Consumes(type: string, limit?: string):
    (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => any {
    return Before(ConsumesFunction(type, limit));
}

export default Consumes;
