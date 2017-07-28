import Contexted from './Contexted';

function Context(target: any, key: string, index?: number): any {
    return Contexted(null)(target, key, index);
}

export default Context;
