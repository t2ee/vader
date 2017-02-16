import ControllerProperty from '../core/ControllerProperty';
export default function decorate(func: (property: ControllerProperty) => (target: any, key?: string, index?: number) => void): (target: any, key?: string, index?: number) => void;
