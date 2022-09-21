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
exports.Plane = void 0;
require("reflect-metadata");
var plane = {
    color: 'red',
};
Reflect.defineMetadata('note', 'hi there', plane);
console.log(plane);
var note = Reflect.getMetadata('note', plane);
console.log(note);
var Plane = /** @class */ (function () {
    function Plane() {
        this.color = 'red';
    }
    Plane.prototype.fly = function () {
        console.log('vrrrrrr');
    };
    __decorate([
        markFunction('Fly bird'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Plane.prototype, "fly", null);
    Plane = __decorate([
        Controller
    ], Plane);
    return Plane;
}());
exports.Plane = Plane;
function markFunction(secretInfo) {
    return function (target, key) {
        Reflect.defineMetadata('secret', secretInfo, target, key);
    };
}
function Controller(target) {
    for (var key in target.prototype) {
        var secret = Reflect.getMetadata('secret', target.prototype, key);
        console.log(secret);
    }
}
