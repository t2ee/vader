import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function DELETE(target: any): void
function DELETE(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): void
function DELETE(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): void {
    Method(HttpMethod.DELETE)(target, method, descriptor);
}

export default DELETE;