import VaderContext from '../core/VaderContext';
import RouteProperty from '../core/RouteProperty';
import IParameter from '../core/IParameter';
declare class ControllerProperty {
    WARES: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void>>;
    PARAMS: Array<IParameter>;
    ROUTES: Array<RouteProperty>;
    PATH: string;
}
export default ControllerProperty;
