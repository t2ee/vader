import Response from './Response';

type AfterMiddleware = (response: Response) => Promise<Response>;

export default AfterMiddleware;

