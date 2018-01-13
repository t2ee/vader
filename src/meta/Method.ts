import HttpMethod from '../constants/HttpMethod';
import MetadataDecorator from './MetadataDecorator';

export default function Method(method: HttpMethod) {
    return (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) => {
        MetadataDecorator({ method })(target, key);
    };
}
