import HttpMethod from 'enums/HttpMethod';
import Method from 'decorators/Method';

const POST = Method(HttpMethod.toString(HttpMethod.POST));

export default POST;
