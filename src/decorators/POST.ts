import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function POST(target: any): any;
function POST(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): any;
function POST(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    return Method(HttpMethod.POST)(target, method, descriptor);
}

export default POST;
