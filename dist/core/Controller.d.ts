import VaderContext from '../core/VaderContext';
import RouteProperty from '../core/RouteProperty';
import Parameter from '../core/Parameter';
export default class Controller {
    WARES: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void>>;
    PARAMS: Array<Parameter>;
    ROUTES: Array<RouteProperty>;
    PATH: string;
}
