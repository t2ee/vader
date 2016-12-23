import ControllerProperty from '../core/ControllerProperty';
import 'reflect-metadata';
export default function decorate(func: (property: ControllerProperty) => (target, key?: string, index?: number) => void): (target: any, key?: string, index?: number) => void;
