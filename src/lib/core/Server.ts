import * as Express from 'express';
import { Application, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as handlebars from 'express-handlebars';

// this will probably be in tx suite

const config = {
    handlebars: true
}

import { Module } from './Module';

export class Server {

    private port = process.env.TYPEX_APP_PORT || 3600;
    private app: Application = Express();

    private modules: Module[] = [];

    constructor() {

        this.app.use(bodyParser.json());
        this.app.use(Express.static('public'));

        if(Server.config().handlebars) {

            this.configureHBS();

        }

        this.onInit();

        this.bootstrapModules();

        this.app.listen(this.port, () => {
            this.onStart();
            this.modules.map(module => module.onStart());
            this.modules.map(module => module._onStart());
        });
    }

    public module(module: any){
        
        this.modules.push(module);

    }

    /**
     * Part of lifecycle where you should attach your controllers
     * example: this.user(ExampleController)
     */
    public onInit(): void {}

    /**
     * Part of lifecycle after app started listening
     */
    public onStart(): void {}

    /**
     * Manually sets port of app,
     * overrides process.env.PORT,
     * works just in onInit function
     */
    public setPort(port: number): void {
        this.port = port;
    }

    public getPort(): number {
        return this.port;
    }

    public getExpressApp(): Application {
        return this.app;
    }

    public use(middleware) {
        this.app.use(middleware);
    }

    public static config(): any {
        return config;
    }

    private configureHBS() {

        const hbs = handlebars.create({
            helpers: {},
            defaultLayout: 'main'
        });

        this.app.engine('handlebars', hbs.engine);
        this.app.set('view engine', 'handlebars');

    }

    private bootstrapModules() {
        this.modules = this.modules.map((module: any) => {
            
            try{
                return new module(this.app);
            } catch(err) {
                throw new Error(err);
            } 
        
        });
    }

}
