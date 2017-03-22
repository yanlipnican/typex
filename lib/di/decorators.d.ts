import 'reflect-metadata';
export declare class Container {
    private instances;
    private dependencies;
    add(klass: any): void;
    inject(target: any): any;
    bootstrap(klass: any): any;
}
export declare function injectable(target: any): any;
