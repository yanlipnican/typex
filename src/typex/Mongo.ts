import * as mongoose from 'mongoose';

// compiled models
const models = {};

export function model<T>(name: string, options?:any) {
    const model = mongoose.model<mongoose.Document>(name, new mongoose.Schema(options));

    return model;
}

export class Model<T> {

    data: T;
    name: string;
    options: any;

    constructor(data?: T) {

        this.data = data;

    }

    public async save(): Promise<any> {

        let dat = new this.model(this.data);

        return await dat.save();

    }

    public async find(opt?: any): Promise<any> {

        return await this.model.find(opt);

    }

    get model() {

        if(typeof models[this.name] === 'undefined') {
            models[this.name] = model<T>(this.name, this.options);
        }

        return models[this.name];

    }

}

