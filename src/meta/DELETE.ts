import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function DELETE() {
    return Method(HttpMethod.DELETE);
}
