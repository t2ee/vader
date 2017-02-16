import VaderContext from '../core/VaderContext';
declare type IMiddleware = (context: VaderContext, next: () => Promise<void>) => Promise<void>;
export default IMiddleware;
