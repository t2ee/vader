import ContextDecorator from './ContextDecorator';

export default function Request() {
    return ContextDecorator({ type: 'request' });
}
