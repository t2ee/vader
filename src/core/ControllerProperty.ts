import VaderContext from  '../core/VaderContext';
import RouteProperty from  '../core/RouteProperty';
import IParameter from  '../core/IParameter';
import createArray from '../utils/createArray';

class ControllerProperty {
    WARES: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void> > = [];
    PARAMS: Array<IParameter> = [];
    ROUTES: Array<RouteProperty> = createArray(RouteProperty);
    PATH: string = '';
}
export default ControllerProperty;
