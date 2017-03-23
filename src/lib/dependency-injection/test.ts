import { injectable } from './decorators';
import { Container } from './container';

/**
 * Classes needs to be in order 
 */

@injectable
class OMG {
    name = 'asd';
}

@injectable
class Di {
    name = 'dasd';
    constructor(private omg: OMG) {}
}

@injectable
class i{
    
    name: string;
    constructor(private di: Di, private omg: OMG){
        this.name = di.name;
    }
}

let container = new Container();

container.add(Di);
container.add(OMG);
container.add(i);

console.log(container.bootstrap(i));