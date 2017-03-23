import 'reflect-metadata';
import { construct } from '../utils';

export class Container{

    private instances: {[key:string]: any} = {};

    private dependencies: {[key:string]: any} = {};

    public add(klass: any): void{

        this.dependencies[klass.name] = klass;

    }

    public inject(target: any): any {

        if(typeof this.instances[target.name] !== 'undefined'){
            return this.instances[target.name];
        }
    
        let injections = Reflect.getMetadata("design:paramtypes", target);

        let args = [];
        
        if(typeof injections !== 'undefined'){

            for(let klass of injections){
                
                if(typeof this.instances[klass.name] === 'undefined'){
                    this.instances[klass.name] = this.inject(klass);    
                }

                args.push(this.instances[klass.name]);

            }
        }

        let instance = construct(target, args);

        this.instances[target.name] = instance;


        return instance;

    }

    public bootstrap(klass: any) {
        return this.inject(klass);
    }

}