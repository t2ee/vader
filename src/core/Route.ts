import MediaType from '../constants/MediaType';
import * as pathToRegexp from 'path-to-regexp';
import HttpMethod from '../constants/HttpMethod';

interface Route {
    path: pathToRegexp.PathRegExp;
    params: pathToRegexp.Key[];
    consume: MediaType;
    produce: MediaType;
    method: HttpMethod;
    func: Function;
}

export default Route;
