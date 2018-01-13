import ContextDecorator from './ContextDecorator';

export default function Query(key?: string) {
    return ContextDecorator({ type: 'query', key });
}
