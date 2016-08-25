import MediaType from  '../enums/MediaType';
export default function Consume(type: MediaType): (target: any, key: string) => void;
