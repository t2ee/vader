import VaderContext from '../core/VaderContext';
import RouteProperty from '../core/RouteProperty';
import IParameter from '../core/IParameter';
export default class ControllerProperty {
    WARES: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void>>;
    PARAMS: Array<IParameter>;
    ROUTES: Array<RouteProperty>;
    PATH: string;
}
