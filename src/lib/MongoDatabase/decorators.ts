import 'reflect-metadata';

export function MongoModel(collectionName: string) {

    return (target: any) => {

        Reflect.defineMetadata('collectionName', collectionName, target);
        return target;

    }

}
