import Response from './Response';
import Request from './Request';

type AfterMiddleware = (request: Request, response: Response) => Promise<void>;

export default AfterMiddleware;

