import 'reflect-metadata';
import {construct} from '../utils';
import {injectionProperty, functionHashmap} from './interfaces';
import {InjectableIsAddedException, InjectableIsNotAddedException} from './exceptions';

export class Container {

    private injectables: functionHashmap = {};
    private instances: functionHashmap = {};

    public inject(target: Function): any {

        if (typeof this.instances[target.name] !== 'undefined') {
            return this.instances[target.name];
        }

        let instance = this.injectConstructorArguments(target);

        this.injectProperties(instance, target);

        this.instances[target.name] = instance;

        return instance;

    }

    public addInjectable(provider, injectable?) {

        let key = provider.name;

        if (typeof this.injectables[key] !== 'undefined') {
            throw new InjectableIsAddedException();
        }

        this.injectables[key] = injectable || provider;

    }

    public getInjectable(injectable) {

        let key = injectable.name;

        if (typeof this.injectables[key] === 'undefined') {
            throw new InjectableIsNotAddedException(injectable);
        }

        return this.injectables[key];

    }

    public bootstrap(klass: any) {
        return this.inject(klass);
    }

    public hasInstance(key: string): boolean {

        return typeof this.instances[key] !== 'undefined';

    }

    public getInstance(key: string): Function {

        return this.instances[key];

    }

    public onInit() {
        for (let key in this.instances) {

            let instance: any = this.instances[key];

            if (typeof instance.onInit !== 'undefined') {
                instance.onInit();
            }

        }
    }

    public onStart() {
        for (let key in this.instances) {

            let instance: any = this.instances[key];

            if (typeof instance.onInit !== 'undefined') {
                instance.onStart();
            }

        }
    }

    private injectConstructorArguments(target: Function): Function {

        let injections = Reflect.getMetadata("design:paramtypes", target);

        let args = [];

        if (typeof injections !== 'undefined') {

            for (let klass of injections) {

                if (typeof this.instances[klass.name] === 'undefined') {
                    let injectable = this.getInjectable(klass);
                    this.instances[klass.name] = this.inject(injectable);
                }

                args.push(this.instances[klass.name]);

            }
        }

        return construct(target, args);
    }

    private injectProperties(instance: Function, target: Function): void {

        let propertyInjections: injectionProperty[] = Reflect.getMetadata('propInjectTypes', target.prototype);

        if (typeof propertyInjections === 'undefined') {
            return;
        }

        for (let item of propertyInjections) {

            let key = item.key;
            let klass = item.type;

            if (typeof this.instances[klass.name] === 'undefined') {
                let injectable = this.getInjectable(klass);
                this.instances[klass.name] = this.inject(injectable);
            }

            instance[key] = this.instances[klass.name];

        }

    }

}

