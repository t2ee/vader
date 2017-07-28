import {
    Metadata,
} from '@t2ee/core';

function Path(path: string): (target: any, key?: string) => any {
    return (target: any, key?: string): any => {
        if (key) { // is a method;
            const paths: {[key: string]: string} = Metadata.get('t2ee:vader:route:path', target) || {};
            paths[key] = path;
            Metadata.set('t2ee:vader:route:path', paths, target);
        } else { // is on class
            Metadata.set('t2ee:vader:controller:path', path, target);
        }

        //return target;
    };
}

export default Path;
