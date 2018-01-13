import MetadataDecorator from './MetadataDecorator';
import MediaType from '../constants/MediaType';

export default function Consume(consume: MediaType) {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        MetadataDecorator({ consume })(target, key);
    };
}
