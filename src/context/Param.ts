import ContextDecorator from './ContextDecorator';

export default function Param(key?: string) {
    return ContextDecorator({ type: 'param', key });
}
