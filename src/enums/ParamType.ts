enum ParamType {
    QueryParam,
    PathParam,
    HeaderParam,
    BodyParam,
    Context,
    External,
}

namespace ParamType {
    export function toString(type: ParamType): string {
        switch (type) {
            case ParamType.QueryParam:
                return 'QueryParam';
            case ParamType.PathParam:
                return 'PathParam';
            case ParamType.HeaderParam:
                return 'HeaderParam';
            case ParamType.BodyParam:
                return 'BodyParam';
            case ParamType.Context:
                return 'Context';
            case ParamType.External:
                return 'External';
        }
    }
}

export default ParamType;
