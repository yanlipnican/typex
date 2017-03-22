"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var express_1 = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
// this will probably be in tx suite
var config = {
    handlebars: true
};
var Controller_1 = require("./Controller");
var Server = (function () {
    function Server() {
        var _this = this;
        this.port = process.env.PORT || 3600;
        this.app = Express();
        this.controllers = [];
        this.app.use(bodyParser.json());
        if (Server.config().handlebars) {
            this.configureHBS();
        }
        this.onInit();
        this.app.listen(this.port, function () {
            console.log("Listening on port \"" + _this.port + "\"");
            _this.onStart();
            _this.controllers.map(function (controller) { return controller.onStart(); });
        });
    }
    /**
     * Part of lifecycle where you should attach your controllers
     * example: this.user(ExampleController)
     */
    Server.prototype.onInit = function () { };
    /**
     * Part of lifecycle after app started listening
     */
    Server.prototype.onStart = function () { };
    /**
     * Attach controller extended class
     */
    Server.prototype.controller = function (controller) {
        var instance = new controller();
        var routes = instance.constructor.prototype._routes;
        var router = express_1.Router();
        instance.onInit();
        this.controllers.push(instance);
        for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
            var route = routes_1[_i];
            var method = route.method.bind(instance);
            var path = route.path;
            var type = route.type;
            switch (type) {
                case Controller_1.RequestType.GET:
                    router.get(path, method);
                    break;
                case Controller_1.RequestType.POST:
                    router.post(path, method);
                    break;
            }
        }
        this.app.use(instance.route || '/', router);
    };
    /**
     * Manually sets port of app,
     * overrides process.env.PORT,
     * works just in onInit function
     */
    Server.prototype.setPort = function (port) {
        this.port = port;
    };
    Server.prototype.getPort = function () {
        return this.port;
    };
    Server.prototype.getExpressApp = function () {
        return this.app;
    };
    Server.config = function () {
        return config;
    };
    Server.prototype.configureHBS = function () {
        var hbs = handlebars.create({
            helpers: {},
        });
        this.app.engine('handlebars', hbs.engine);
        this.app.set('view engine', 'handlebars');
    };
    return Server;
}());
exports.Server = Server;
