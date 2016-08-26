import HttpMethod from  '../enums/HttpMethod';
import Method from  '../decorators/Method';

const HEAD = Method(HttpMethod.toString(HttpMethod.HEAD));

export default HEAD;
