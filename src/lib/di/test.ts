import 'reflect-metadata';

let dependencies = {};
let singletons = {};

function injectable(target: any) {

    dependencies[target.name] = target;

    return target;
}

@injectable
class Di {
    
    constructor(private omg: OMG) {}

    name = 'dasd';
}

@injectable
class OMG {
    name = 'janko';
}

@injectable
class i{
    
    name: string;
    constructor(private di: Di, private omg: OMG){
        this.name = di.name;
    }
}

function construct(constructor, args) {
    function F() : void {
        constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}

function inject(target: any) {

    let injections = Reflect.getMetadata("design:paramtypes", target);
    let args = [];
    
    if(typeof injections !== 'undefined'){

        console.log(injections);

        for(let klass of injections){
            
            if(typeof singletons[klass.name] === 'undefined'){
                // TODO add injectables to dictionary, becouse they are not decored inside metadata
                singletons[klass.name] = inject(klass);    
            }
    
            args.push(singletons[klass.name]);
    
        }
    }

    return construct(target, args);

}

console.log(inject(i));