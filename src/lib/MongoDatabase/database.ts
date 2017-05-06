import { MongoClient, Db } from 'mongodb';
import { injectable } from '../dependency-injection';
import { construct } from '../utils/construct';
import { plainToClass, deserialize } from 'class-transformer';
import { ClassType } from './interfaces';

import 'reflect-metadata';
import 'es6-shim';

@injectable
export class MongoDatabase {

    private mongo: Db;
    private dbPromise: Promise<Db>;

    public async connect(url: string) {

        const promise = new Promise((resolve, reject) => {

            MongoClient.connect(url, (err, db) => {

                if(err){
                    reject(err);
                    console.error(err);
                    return;
                };

                this.mongo = db;

                console.log('connected to MongoDatabase');

            });

        });

        this.dbPromise = promise;

        return promise;

    }

    public async isConnected(): Promise<boolean> {

        if(typeof this.dbPromise === 'undefined') return false;

        try {

            await this.dbPromise;

        } catch (err) {

            return false;

        }

        return true;

    }

    public insert<T>(cls: ClassType<T>, data: any): Promise<any> {

        return new Promise((resolve, reject) => {

            this.getCollectionOfModel(cls).insert(data, (err, res) => {

                if(err){
                    reject(err);
                    console.error(err);
                    return;
                }

                resolve(res.result.n);

            });

        });

    }

    public find<T>(cls: ClassType<T>, query:any): Promise<T[]> {

        return new Promise((resolve, reject) => {

            this.getCollectionOfModel(cls).find(query).toArray((err, res) => {

                if(err){
                    reject(err);
                    console.error(err);
                    return;
                }

                res = res.map(d => deserialize(cls, JSON.stringify(d)));

                resolve(res);

            });

        });

    }

    public async findOne<T>(cls: ClassType<T>, query:any): Promise<T> {

        let json: {} = await this.getCollectionOfModel(cls).findOne(query); // -> returns plain json

        if(json === null) return null;

        //return plainToClass(cls, json);
        return deserialize(cls, JSON.stringify(json));

    }

    public count<T>(cls: ClassType<T>, query:any = {}): Promise<number> {

        return this.getCollectionOfModel(cls).count(query);

    }

    public updateOne<T>(cls: ClassType<T>, query:any = {}, data = {}): Promise<any> {

        return new Promise((resolve, reject) => {
            this.getCollectionOfModel(cls).updateOne(query, { $set : data }, (err, res) => {
                if(err){
                    reject(err);
                    return;
                }

                resolve(res.result.n);
            });
        })

    }

    private getCollectionOfModel<T>(cls: ClassType<T>){

        let collectionName = Reflect.getMetadata('collectionName', cls);
        return this.mongo.collection(collectionName);

    }

}
