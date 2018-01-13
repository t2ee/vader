import {
    Component,
    Container,
} from '@t2ee/core';
import MetadataDecorator from './MetadataDecorator';

function PathDecorator(path: string): (target: any) => any;
function PathDecorator(path: string): (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) => any;
function PathDecorator(path: string) {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        MetadataDecorator({ path })(target, key);
    };
}


export default function Controller() {
    return (target: any) => {
        MetadataDecorator({ controller: true })(target);
        Component()(target);
    };
}
