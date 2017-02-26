import * as Express from 'express';
import { Application, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as handlebars from 'express-handlebars';

// this will probably be in tx suite
let config = require('../../txconfig.json');

import { Controller, RequestType } from 'typex/Controller';

export class Server {

    private port = process.env.PORT || 3600;
    private app: Application = Express();

    private controllers: Controller[] = [];

    constructor() {

        this.app.use(bodyParser.json());

        if(Server.config().handlebars) {

            this.configureHBS();

        }

        this.onInit();

        this.app.listen(this.port, () => {
            console.log(`Listening on port "${this.port}"`);

            this.onStart();

            this.controllers.map(controller => controller.onStart());
        });
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
     * Attach controller extended class
     */
    public controller(controller: typeof Controller): void {

        let instance = new controller();
        let routes = instance.constructor.prototype._routes;
        let router: Router = Router();

        instance.onInit();

        this.controllers.push(instance);

        for (let route of routes) {

            let method = route.method.bind(instance);
            let path: string = route.path;
            let type: RequestType = route.type;

            switch (type) {
                case RequestType.GET:
                    router.get(path, method);
                    break;
                case RequestType.POST:
                    router.post(path, method);
                    break;
            }

        }

        this.app.use(instance.route || '/', router);

    }

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

    public static config(): any {
        return config;
    }

    private configureHBS() {

        const hbs = handlebars.create({
            helpers: {},
        });

        this.app.engine('handlebars', hbs.engine);
        this.app.set('view engine', 'handlebars');

    }

}