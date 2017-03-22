/// <reference types="express" />
import { Application } from 'express';
import { Controller } from './Controller';
export declare class Server {
    private port;
    private app;
    private controllers;
    constructor();
    /**
     * Part of lifecycle where you should attach your controllers
     * example: this.user(ExampleController)
     */
    onInit(): void;
    /**
     * Part of lifecycle after app started listening
     */
    onStart(): void;
    /**
     * Attach controller extended class
     */
    controller(controller: typeof Controller): void;
    /**
     * Manually sets port of app,
     * overrides process.env.PORT,
     * works just in onInit function
     */
    setPort(port: number): void;
    getPort(): number;
    getExpressApp(): Application;
    static config(): any;
    private configureHBS();
}
