namespace Metadata {
    export function set(metaKey: string, metaValue: any, target: any, key?: string | symbol)  {
        return (Reflect as any).defineMetadata(metaKey, metaValue, target, key);
    }
    export function get(metaKey: string, target: any, key?: string | symbol)  {
        return (Reflect as any).getMetadata(metaKey, target, key);
    }
    export const builtIn = {
        TYPE: 'design:type',
        PARAM_TYPE: 'design:paramtypes',
        RETURN_TYPE: 'design:returntype',
    };
}
export default Metadata; 