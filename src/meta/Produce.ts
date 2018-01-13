import MetadataDecorator from './MetadataDecorator';
import MediaType from '../constants/MediaType';

export default function Produce(produce: MediaType) {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        MetadataDecorator({ produce })(target, key);
    };
}
