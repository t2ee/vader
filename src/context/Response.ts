import ContextDecorator from './ContextDecorator';

export default function Response() {
    return ContextDecorator({ type: 'response' });
}
