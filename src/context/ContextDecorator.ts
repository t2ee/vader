import {
    AutoWired,
} from '@t2ee/core';

export default function ContextDecorator(data) {
    return (target: any, key: string, index: number) => {
        AutoWired(null, data, Symbol.for('t2ee:vader:context'))(target, key, index);
    };
}
