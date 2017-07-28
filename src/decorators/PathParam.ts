import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function PathParam(target: any, key: string, index?: number): any;
function PathParam(name: string): (target: any, key: string, index?: number) => any;
function PathParam(targeOrNamet: string | any, key?: string, index?: number):
  (target: any, key: string, index?: number) => any | any {
    if (typeof targeOrNamet === 'string') {
      return Contexted((request: Request) => request.params.get(targeOrNamet));
    } else {
      return Contexted((request: Request) => request.params.get(key))(targeOrNamet, key, index);
    }
}

export default PathParam;
