import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function GET(target: any): any;
function GET(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): any;
function GET(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    return Method(HttpMethod.GET)(target, method, descriptor);
}

export default GET;
