import Param from '../core/decorators/Param';
import Request from '../core/Request';

function HeaderParam(target: any, key: string, index?: number): any;
function HeaderParam(name: string): (target: any, key: string, index?: number) => any;
function HeaderParam(targeOrNamet: string | any, key?: string, index?: number):
  (target: any, key: string, index?: number) => any | any {
    if (typeof targeOrNamet === 'string') {
      return Param((request: Request) => request.headers.get(targeOrNamet));
    } else {
      return Param((request: Request) => request.headers.get(key))(targeOrNamet, key, index);
    }
}

export default HeaderParam;
