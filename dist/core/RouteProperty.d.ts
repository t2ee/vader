import MediaType from  '../enums/MediaType';
import VaderContext from  '../core/VaderContext';
import IParameter from  '../core/IParameter';
export default class RouteProperty {
    method: string;
    paths: Array<string>;
    wares: Array<(context: VaderContext, next: () => Promise<void>) => Promise<void>>;
    produce: MediaType;
    consume: MediaType;
    params: Array<IParameter>;
}
