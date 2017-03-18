import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function PUT(target: any): any;
function PUT(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): any;
function PUT(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    return Method(HttpMethod.PUT)(target, method, descriptor);
}

export default PUT;
