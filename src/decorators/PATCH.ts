import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function PATCH(target: any): void
function PATCH(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): void
function PATCH(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): void {
    Method(HttpMethod.PATCH)(target, method, descriptor);
}

export default PATCH;