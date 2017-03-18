import Param from '../core/decorators/Param';
import Request from '../core/Request';

function PathParam(target: any, key: string, index?: number): any;
function PathParam(name: string): (target: any, key: string, index?: number) => any;
function PathParam(targeOrNamet: string | any, key?: string, index?: number):
  (target: any, key: string, index?: number) => any | any {
    if (typeof targeOrNamet === 'string') {
      return Param((request: Request) => request.params.get(targeOrNamet));
    } else {
      return Param((request: Request) => request.params.get(key))(targeOrNamet, key, index);
    }
}

export default PathParam;
