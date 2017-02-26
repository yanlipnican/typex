import * as mongoose from 'mongoose';

export function model<T>(name: string, options:any) {
    const model = mongoose.model<mongoose.Document>(name, options);

    return model;
}

export class Model {

    data;
    onInit() {}
    constructor(data ?) { }
    async save(): Promise<any> {}

    toJson() {
        return this.data;
    }

}

export function modelDec(target: any) {
    // save a reference to the original constructor
    var original = target;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c: any = function () {
            return constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
    }

    // the new constructor behaviour
    var f: any = function (data: any) {
        let instance = construct(original, []);

        instance.data = new target.model(data);

        instance.save = async function(): Promise<any> {
            return await instance.data.save();
        }

        instance.onInit();

        return instance;
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    f.find = async function find(query?): Promise<mongoose.Document[]>{
        return await target.model.find(query);
    }

    // return new constructor (will override original)
    return f;
}
