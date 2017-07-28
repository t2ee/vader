import Contexted from '../core/decorators/Contexted';
import Request from '../core/Request';

function QueryParam(target: any, key: string, index?: number): any;
function QueryParam(name: string): (target: any, key: string, index?: number) => any;
function QueryParam(targeOrNamet: string | any, key?: string, index?: number):
  (target: any, key: string, index?: number) => any | any {
    if (typeof targeOrNamet === 'string') {
      return Contexted((request: Request) => request.query.get(targeOrNamet));
    } else {
      return Contexted((request: Request) => request.query.get(key))(targeOrNamet, key, index);
    }
}

export default QueryParam;
