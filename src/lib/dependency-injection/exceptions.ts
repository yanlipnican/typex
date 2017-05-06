export class InjectableIsAddedException extends Error {

    name = 'Typex module';
    message = 'Injectable is alredy added to module.';

}

export class InjectableIsNotAddedException extends Error {

    constructor(injectable) {
        super();

        this.name = 'Typex module';
        this.message = `Injectable "${injectable.name}" is not in module.`;
    }

}
