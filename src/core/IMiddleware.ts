import VaderContext from 'core/VaderContext';
type IMiddleware = (context: VaderContext, next: () => Promise<void>) => Promise<void>;

export default IMiddleware;
