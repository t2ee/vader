import MediaType from '../enums/MediaType';
import 'reflect-metadata';
export default function Consume(type: MediaType): (target: any, key: string) => void;
