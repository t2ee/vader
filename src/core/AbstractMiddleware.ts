import VaderContext from  '../core/VaderContext';

abstract class AbstractMiddleware {
    abstract before(context: VaderContext): Promise<void>;
    abstract after(context: VaderContext): Promise<void>;
}

export default AbstractMiddleware;
