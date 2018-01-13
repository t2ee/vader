import {
    Metadata,
} from '@t2ee/core';

export default function MetadataDecorator(data) {
    return (target: any, key?: string, index?: number): any => {
        const isParameter: boolean = index !== undefined;

        if (key === undefined && index === undefined) {
            const meta = Metadata.get('t2ee:vader:metadata:class', target) || {};
            Metadata.set('t2ee:vader:metadata:class', Object.assign({}, meta, data), target);
            return;
        }

        if (isParameter) {
            const meta = Metadata.get('t2ee:vader:metadata:parameter', target) || {};
            meta[key] = meta[key] || [];
            meta[key][index] = Object.assign({}, meta[key][index] || {}, data);
            Metadata.set('t2ee:vader:metadata:parameter', meta, target);
        } else {
            const meta = Metadata.get('t2ee:vader:metadata:property', target) || {};
            meta[key] = Object.assign({}, meta[key] || {}, data);
            Metadata.set('t2ee:vader:metadata:property', meta, target);
        }
    };
}
