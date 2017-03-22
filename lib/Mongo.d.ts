/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
export declare function model<T>(name: string, options?: any): mongoose.Model<mongoose.Document>;
export declare class Model<T> {
    data: T;
    name: string;
    options: any;
    constructor(data?: T);
    save(): Promise<any>;
    find(opt?: any): Promise<any>;
    readonly model: any;
}
