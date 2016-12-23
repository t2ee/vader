import MediaType from '../enums/MediaType';
import 'reflect-metadata';
export default function Produce(type: MediaType): (target: any, key: string) => void;
