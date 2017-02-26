export class Controller {

    public route: string;

    public onInit(): void{ }

    protected response(data: any){

        let response = data;

        response.helpers = this.constructor.prototype._hbs_helpers;

        for(let key in response.helpers){
            response.helpers[key] = response.helpers[key].bind(this);
        }

        return response;

    }

}


export enum RequestType {
    POST = 1,
    GET = 2,
}

export function Post(path: string) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        target._routes = target._routes || [];
        target._routes.push({path, method: descriptor.value, type: RequestType.POST});
        return descriptor;

    };

}

export function Get(path: string) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        target._routes = target._routes || [];
        target._routes.push({path, method: descriptor.value, type: RequestType.GET});
        return descriptor;

    }

}

export function HBS_helper(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    target._hbs_helpers = target._hbs_helpers || {};
    target._hbs_helpers[propertyKey] = descriptor.value;

    return descriptor;

}
