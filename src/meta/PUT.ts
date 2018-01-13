import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function PUT() {
    return Method(HttpMethod.PUT);
}
