import 'reflect-metadata';
export declare class Container {
    private instances;
    private dependencies;
    add(klass: any): void;
    construct(constructor: any, args: any): any;
    inject(target: any): any;
    bootstrap(klass: any): any;
}
export declare function injectable(target: any): any;
