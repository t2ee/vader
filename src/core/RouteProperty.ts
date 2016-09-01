import MediaType from  '../enums/MediaType';
import HttpMethod from  '../enums/HttpMethod';
import VaderContext from  '../core/VaderContext';
import IParameter from  '../core/IParameter';
import createArray from '../utils/createArray';

export default class RouteProperty {
    METHOD: string;
    PATHS: Array<string> = [];
    WARES: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void> > = [];
    PRODUCE: MediaType;
    CONSUME: MediaType;
    PARAMS: Array<IParameter> = [];
}
