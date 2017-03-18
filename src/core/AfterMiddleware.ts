import Response from './Response';

type AfterMiddleware = (request: Response) => Promise<Response>;

export default AfterMiddleware;

