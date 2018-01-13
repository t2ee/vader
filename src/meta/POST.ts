import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function POST() {
    return Method(HttpMethod.POST);
}
