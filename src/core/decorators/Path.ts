import {
    utils,
} from '@t2ee/core';
const { Metadata } = utils;
import HttpMethod from '../../enums/HttpMethod';

function Path(path: String) {
    return (target: any, key?: string): void => {
        if (key) { // is a method;
            const paths = Metadata.get('vader:route:path', target) || {};
            paths[key] = path;
            Metadata.set('vader:route:path', paths, target);
        } else { // is on class
            Metadata.set('vader:controller:path', path, target);
        }
    }
}

export default Path;