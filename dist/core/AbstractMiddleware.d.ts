import VaderContext from '../core/VaderContext';
declare abstract class AbstractMiddleware {
    abstract before(context: VaderContext): Promise<void>;
    abstract after(context: VaderContext): Promise<void>;
}
export default AbstractMiddleware;
