declare namespace Metadata {
    function set(metaKey: string, metaValue: any, target: any, key?: string | symbol): any;
    function get(metaKey: string, target: any, key?: string | symbol): any;
    const builtIn: {
        TYPE: string;
        PARAM_TYPE: string;
        RETURN_TYPE: string;
    };
}
export default Metadata;
