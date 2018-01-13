import ContextDecorator from './ContextDecorator';

export default function Header(key?: string) {
    return ContextDecorator({ type: 'header', key });
}
