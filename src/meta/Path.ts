import MetadataDecorator from './MetadataDecorator';

export default function Path(path: string) {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        MetadataDecorator({ path })(target, key);
    };
}

