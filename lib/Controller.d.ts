export declare class Controller {
    route: string;
    /**
     * Runs while initializing controller
     */
    onInit(): void;
    /**
     * Runs after server start listen
     */
    onStart(): void;
    /**
     * Function attach hbs helper functions to response.
     */
    protected response(data: any): any;
    private configureHBS(response);
}
export declare enum RequestType {
    POST = 1,
    GET = 2,
}
export declare function Post(path: string): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export declare function Get(path: string): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export declare function HBS_helper(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
export declare function baseRequestDecorator(path: string, type: RequestType): (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
