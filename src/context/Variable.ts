import ContextDecorator from './ContextDecorator';

export default function Variable(key?: string) {
    return ContextDecorator({ type: 'variable', key });
}
