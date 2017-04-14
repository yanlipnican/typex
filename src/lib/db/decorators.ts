import 'reflect-metadata';

export function Model(collectionName: string) {

    return (target: any) => {

        Reflect.defineMetadata('collectionName', collectionName, target);
        return target;

    }

}