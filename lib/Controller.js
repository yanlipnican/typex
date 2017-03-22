"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
var Controller = (function () {
    function Controller() {
    }
    /**
     * Runs while initializing controller
     */
    Controller.prototype.onInit = function () { };
    /**
     * Runs after server start listen
     */
    Controller.prototype.onStart = function () { };
    /**
     * Function attach hbs helper functions to response.
     */
    Controller.prototype.response = function (data) {
        var response = data;
        if (Server_1.Server.config().handlebars) {
            this.configureHBS(response);
        }
        return response;
    };
    Controller.prototype.configureHBS = function (response) {
        response.helpers = this.constructor.prototype._hbs_helpers;
        for (var key in response.helpers) {
            response.helpers[key] = response.helpers[key].bind(this);
        }
    };
    return Controller;
}());
exports.Controller = Controller;
var RequestType;
(function (RequestType) {
    RequestType[RequestType["POST"] = 1] = "POST";
    RequestType[RequestType["GET"] = 2] = "GET";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
function Post(path) {
    return baseRequestDecorator(path, RequestType.POST);
}
exports.Post = Post;
function Get(path) {
    return baseRequestDecorator(path, RequestType.GET);
}
exports.Get = Get;
function HBS_helper(target, propertyKey, descriptor) {
    if (!Server_1.Server.config().handlebars) {
        console.warn('For hbs helpers to work, "handlebars" property must be set in txconfig.');
        return descriptor;
    }
    target._hbs_helpers = target._hbs_helpers || {};
    target._hbs_helpers[propertyKey] = descriptor.value;
    return descriptor;
}
exports.HBS_helper = HBS_helper;
function baseRequestDecorator(path, type) {
    return function (target, propertyKey, descriptor) {
        target._routes = target._routes || [];
        target._routes.push({ path: path, method: descriptor.value, type: type });
        return descriptor;
    };
}
exports.baseRequestDecorator = baseRequestDecorator;
