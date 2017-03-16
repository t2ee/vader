import HttpMethod from '../enums/HttpMethod';
import Method from '../core/decorators/Method';


function POST(target: any): void
function POST(target: any, method: string, descriptor: TypedPropertyDescriptor<any>): void
function POST(target: any, method?: string, descriptor?: TypedPropertyDescriptor<any>): void {
    Method(HttpMethod.POST)(target, method, descriptor);
}

export default POST;