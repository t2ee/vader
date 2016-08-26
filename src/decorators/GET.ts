import HttpMethod from  '../enums/HttpMethod';
import Method from  '../decorators/Method';

const GET = Method(HttpMethod.toString(HttpMethod.GET));

export default GET;
