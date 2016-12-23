export function get(key: string, target) {
    return (Reflect as any).getMetadata(key, target.prototype || target);
}
export function set(key: string, value, target) {
    (Reflect as any).defineMetadata(key, value, target.prototype || target);
}
