import HttpMethod from 'enums/HttpMethod';
import Method from 'decorators/Method';

const OPTIONS = Method(HttpMethod.toString(HttpMethod.OPTIONS));

export default OPTIONS;
