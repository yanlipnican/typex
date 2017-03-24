import 'reflect-metadata';

import { construct } from '../utils';
import { injectionProperty, functionHashmap } from './interfaces';

export class Container{

    private instances: functionHashmap = {};
    private dependencies: functionHashmap = {};

    public inject(target: Function): any {

        if(typeof this.instances[target.name] !== 'undefined'){
            return this.instances[target.name];
        }

        let instance = this.injectConstructorArguments(target);

        this.injectProperties(instance, target);

        this.instances[target.name] = instance;

        return instance;

    }

    public bootstrap(klass: any) {
        return this.inject(klass);
    }

    private injectConstructorArguments(target: Function): Function {

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

        return construct(target, args);
    }

    private injectProperties(instance: Function, target: Function): void {

        let propertyInjections: injectionProperty[] = Reflect.getMetadata('propInjectTypes', target.prototype);
        
        if(typeof propertyInjections === 'undefined'){
            return;
        }

        for(let item of propertyInjections){
        
            let key = item.key;
            let klass = item.type;

            if(typeof this.instances[klass.name] === 'undefined'){
                this.instances[klass.name] = this.inject(klass);    
            }

            instance[key] = this.instances[klass.name];
            
        }

    }

}
