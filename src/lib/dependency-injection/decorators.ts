import { injectionProperty } from './interfaces';

export function injectable(target: any) {
    /**
     * to have design:paramtypes, class has to be decorated.
     */
    return target;
}

export function inject(target: any, key: string) {
    
    let metadatakey = 'propInjectTypes'

    let type = Reflect.getMetadata('design:type', target, key);

    let items: injectionProperty[] = [{key, type}]

    if(Reflect.hasMetadata(metadatakey, target)){

        let additionalItems: injectionProperty[] = Reflect.getMetadata(metadatakey, target);
        items = items.concat(additionalItems);
        
    }

    Reflect.defineMetadata(metadatakey, items, target);

}