enum ParamType {
    QueryParam,
    PathParam,
    HeaderParam,
    BodyParam,
    Context,
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
        }
    }
}

export default ParamType;
