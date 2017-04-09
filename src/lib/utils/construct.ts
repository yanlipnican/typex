export function construct(constructor, args) {
    function F() : void {
        constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    try{
        return new F();
    } catch(err) {
        throw new Error(err);
    }
}