export function construct(constructor, args) {
    function F() : void {
        constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
}