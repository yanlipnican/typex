import { MongoClient, Db } from 'mongodb';
import { injectable } from '../dependency-injection';
import { construct } from '../utils/construct';

@injectable
export class Database {

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

                console.log('connected to db');
            
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

    public insert(collectionName: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => { 

            let collection = this.mongo.collection(collectionName);

            collection.insert(data, (err, res) => {

                if(err){
                    reject(err);
                    console.error(err);
                    return;
                }

                resolve(res);

            });

        });
        
    }

    public find(collectionName: string, query:any): Promise<any> {

        return new Promise((resolve, reject) => { 

            let collection = this.mongo.collection(collectionName);

            collection.find(query).toArray((err, res) => {

                if(err){
                    reject(err);
                    console.error(err);
                    return;
                }

                resolve(res);

            });

        });

    }

}