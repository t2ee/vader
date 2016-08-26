import HttpMethod from  '../enums/HttpMethod';
import Method from  '../decorators/Method';

const DELETE = Method(HttpMethod.toString(HttpMethod.DELETE));

export default DELETE;
