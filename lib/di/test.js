"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
/**
 * Classes needs to be in order
 */
var OMG = (function () {
    function OMG() {
        this.name = 'asd';
    }
    return OMG;
}());
OMG = __decorate([
    decorators_1.injectable
], OMG);
var Di = (function () {
    function Di(omg) {
        this.omg = omg;
        this.name = 'dasd';
    }
    return Di;
}());
Di = __decorate([
    decorators_1.injectable,
    __metadata("design:paramtypes", [OMG])
], Di);
var i = (function () {
    function i(di, omg) {
        this.di = di;
        this.omg = omg;
        this.name = di.name;
    }
    return i;
}());
i = __decorate([
    decorators_1.injectable,
    __metadata("design:paramtypes", [Di, OMG])
], i);
var container = new decorators_1.Container();
container.add(Di);
container.add(OMG);
container.add(i);
console.log(container.bootstrap(i));