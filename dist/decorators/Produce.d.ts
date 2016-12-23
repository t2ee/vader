import MediaType from '../enums/MediaType';
export default function Produce(type: MediaType): (target: any, key: string) => void;
