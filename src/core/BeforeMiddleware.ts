import Request from './Request';

type BeforeMiddleware = (request: Request) => Promise<Request>;

export default BeforeMiddleware;