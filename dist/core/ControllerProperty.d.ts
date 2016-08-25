import VaderContext from  '../core/VaderContext';
import RouteProperty from  '../core/RouteProperty';
import IParameter from  '../core/IParameter';
export default class ControllerProperty {
    wares: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void>>;
    routes: {
        [key: string]: RouteProperty;
    };
    path: string;
    params: {
        [key: string]: IParameter;
    };
}
