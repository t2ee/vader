import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function HeaderParam(target: any, key: string, index?: number): any;
function HeaderParam(name: string): (target: any, key: string, index?: number) => any;
function HeaderParam(targeOrNamet: string | any, key?: string, index?: number):
  (target: any, key: string, index?: number) => any | any {
    if (typeof targeOrNamet === 'string') {
      return Contexted((request: Request) => request.headers.get(targeOrNamet));
    } else {
      return Contexted((request: Request) => request.headers.get(key))(targeOrNamet, key, index);
    }
}

export default HeaderParam;
