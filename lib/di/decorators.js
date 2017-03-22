"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Container = (function () {
    function Container() {
        this.instances = {};
        this.dependencies = {};
    }
    Container.prototype.add = function (klass) {
        this.dependencies[klass.name] = klass;
    };
    Container.prototype.construct = function (constructor, args) {
        function F() {
            constructor.apply(this, args);
        }
        F.prototype = constructor.prototype;
        return new F();
    };
    Container.prototype.inject = function (target) {
        if (typeof this.instances[target.name] !== 'undefined') {
            return this.instances[target.name];
        }
        var injections = Reflect.getMetadata("design:paramtypes", target);
        var args = [];
        if (typeof injections !== 'undefined') {
            for (var _i = 0, injections_1 = injections; _i < injections_1.length; _i++) {
                var klass = injections_1[_i];
                if (typeof this.instances[klass.name] === 'undefined') {
                    this.instances[klass.name] = this.inject(klass);
                }
                args.push(this.instances[klass.name]);
            }
        }
        var instance = this.construct(target, args);
        this.instances[target.name] = instance;
        return instance;
    };
    Container.prototype.bootstrap = function (klass) {
        return this.inject(klass);
    };
    return Container;
}());
exports.Container = Container;
function injectable(target) {
    /**
     * to have design:paramtypes, class has to be decorated.
     */
    return target;
}
exports.injectable = injectable;
