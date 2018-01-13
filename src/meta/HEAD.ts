import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function HEAD() {
    return Method(HttpMethod.HEAD);
}
