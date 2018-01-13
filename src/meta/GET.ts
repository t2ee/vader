import HttpMethod from '../constants/HttpMethod';
import Method from './Method';

export default function GET() {
    return Method(HttpMethod.GET);
}
