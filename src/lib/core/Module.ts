import { Container } from '../dependency-injection';
import { Controller, RequestType } from './Controller';
import { Application, Router } from 'express';

export class Module{

    private container: Container = new Container();

    private app: Application;

    private controllers: Controller[] = [];

    public router: Router = Router();

    constructor(app: Application) {
        this.app = app;

        this.onInit();

        this.bootstrap();

        this.container.onInit();

        this.app.use('/', this.router);

    }

    public onInit() { }

    public onStart() { }

    public _onStart() {
        this.container.onStart();
    }

    public bootstrap() {

        this.bootstrapControllers();

    }

    public controller(controller: any) {
        this.controllers.push(controller);
    }

    public service(provider, injectable?) {
        this.container.addInjectable(provider, injectable);
    }

    private bootstrapControllers() {

        this.controllers = this.controllers.map(controller => this.bootstrapController(controller));

    }

    private bootstrapController(controller: Controller): any {

        let instance = this.container.bootstrap(controller);
        let routes = instance.constructor.prototype._routes || [];
        let middlewares = instance.constructor.prototype._middlewares || [];
        let router: Router = Router();

        for (let route of routes) {

            let method = route.method.bind(instance);
            let path: string = route.path;
            let type: RequestType = route.type;

            for(let item of middlewares){
                if(item.propertyKey === route.propertyKey){
                    let middleware = this.container.bootstrap(item.middleware);
                    router.use(path, middleware.use.bind(middleware))
                }
            }

            switch (type) {
                case RequestType.GET:
                    router.get(path, method);
                    break;
                case RequestType.POST:
                    router.post(path, method);
                    break;
            }

        }

        this.router.use(instance.route || '/', router);

        return instance

    }

}
