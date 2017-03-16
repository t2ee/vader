import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function PUT(target: any): void
function PUT(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): void
function PUT(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): void {
    Method(HttpMethod.PUT)(target, method, descriptor);
}

export default PUT;