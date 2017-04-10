import { Server } from './Server';
import { IMiddleware } from './Middleware/Middleware'; 

export class Controller {

    public route: string;

    /**
     * Runs while initializing controller
     */
    public onInit(): void { }

    /**
     * Runs after server start listen
     */
    public onStart(): void { }

    /**
     * Function attach hbs helper functions to response.
     */
    protected response(data: any): any{

        let response = data;

        if(Server.config().handlebars) {

          this.configureHBS(response);

        }

        return response;

    }

    private configureHBS(response: any) {

        response.helpers = this.constructor.prototype._hbs_helpers;

        for (let key in response.helpers) {
            response.helpers[key] = response.helpers[key].bind(this);
        }

    }

}


export enum RequestType {
    POST = 1,
    GET = 2,
}

export function Post(path: string) {

    return baseRequestDecorator(path, RequestType.POST);

}

export function Get(path: string) {

    return baseRequestDecorator(path, RequestType.GET);

}

export function HBS_helper(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    if(!Server.config().handlebars){

        console.warn('For hbs helpers to work, "handlebars" property must be set in txconfig.');

        return descriptor;

    }

    target._hbs_helpers = target._hbs_helpers || {};
    target._hbs_helpers[propertyKey] = descriptor.value;

    return descriptor;

}

export function baseRequestDecorator(path: string, type: RequestType) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        target._routes = target._routes || [];
        target._routes.push({path, method: descriptor.value, type, propertyKey});
        return descriptor;

    }

}

export function Middleware(middleware: Function) {

    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {

        target._middlewares = target._middlewares || [];
        target._middlewares.push({middleware, propertyKey});
        return descriptor;

    }

}