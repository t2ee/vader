import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function GET(target: any): void
function GET(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): void
function GET(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): void {
    Method(HttpMethod.GET)(target, method, descriptor);
}

export default GET;