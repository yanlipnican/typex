export class Controller {

    public route: string;

    public init(): void{

    }

}


export enum RequestType {
    POST = 1,
    GET = 2,
}

export function Post(path: string) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target._routes = target._routes || [];
        target._routes.push({path, method: descriptor, type: RequestType.POST});
        return descriptor;
    };
}

export function Get(path: string) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target._routes = target._routes || [];
        target._routes.push({path, method: descriptor, type: RequestType.GET});
        return descriptor;
    };
}
