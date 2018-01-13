import * as Koa from 'koa';
import {
    Provider,
} from '@t2ee/core'

export default class ContextProvider implements Provider {
    constructor(
        private context: Koa.Context,
        private params: any,
        private variables: any,
    ) {}

    resolve<T>(value: T, type: (new (...args: any[]) => any) | Symbol | string, declaredType: new (...args: any[]) => any, data: any): T {
        if (!data) {
            return null;
        }

        let result = null;
        switch (data.type) {
            case 'query':
                result = this.context.query;
                break;
            case 'param':
                result = this.params;
                break;
            case 'body':
                result = this.context.request['body'];
                break;
            case 'header':
                result = this.context.headers;
                break;
            case 'request':
                result = this.context.request;
                break;
            case 'response':
                result = this.context.response;
                break;
            case 'variables':
                result = this.variables;
                break;
        }

        if (result && data.key) {
            result = result[data.key];
        }

        return result;
    }
}
