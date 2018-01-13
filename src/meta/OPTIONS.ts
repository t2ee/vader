import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function OPTIONS() {
    return Method(HttpMethod.OPTIONS);
}
