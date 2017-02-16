export function get(key: string, target: any) {
    return (Reflect as any).getMetadata(key, target.prototype || target);
}
export function set(key: string, value: any, target: any) {
    (Reflect as any).defineMetadata(key, value, target.prototype || target);
}
