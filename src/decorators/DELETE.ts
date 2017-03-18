import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function DELETE(target: any): any;
function DELETE(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): any;
function DELETE(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): any {
    return Method(HttpMethod.DELETE)(target, method, descriptor);
}

export default DELETE;
