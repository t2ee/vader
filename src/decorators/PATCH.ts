import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function PATCH(target: any): any;
function PATCH(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): any;
function PATCH(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    return Method(HttpMethod.PATCH)(target, method, descriptor);
}

export default PATCH;
