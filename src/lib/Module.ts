import { Container } from './dependency-injection';
import { Controller, RequestType } from './Controller';
import { Application, Router } from 'express';

export class Module{

    private container: Container = new Container();

    private app: Application;

    private controllers: Controller[] = [];

    private services: any[] = [];

    public router: Router = Router();

    constructor(app: Application) {
        this.app = app;

        this.onInit();

        this.bootstrap();

        this.initServices();

        this.initControllers();

        this.app.use('/', this.router);

    }

    public onInit() {}

    private initControllers() {
    
        this.controllers.map(controller => controller.onInit());
    
    }

    private initServices() {
        this.services.map(service => {
            
            if(typeof service.onInit !== 'undefined'){
                service.onInit()
            }

        }); 
    }

    public onStart() {
        
        this.controllers.map(controller => controller.onStart())

    }

    public bootstrap() {
    
        this.bootstrapServices();
        this.bootstrapControllers();
    
    }

    public controller(controller: any) {
    
        this.controllers.push(controller);
    
    }

    public service(service: any) {
        
        this.container.add(service);
        this.services.push(service);

    }

    private bootstrapServices() {

        this.services = this.services.map(service => this.container.bootstrap(service));

    }

    private bootstrapControllers() {
        
        this.controllers = this.controllers.map(controller => this.bootstrapController(controller));

    }

    private bootstrapController(controller: Controller): any {

        let instance = this.container.bootstrap(controller);
        let routes = instance.constructor.prototype._routes;
        let router: Router = Router();

        instance.onInit();

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

        this.router.use(instance.route || '/', router);

        return instance

    }

}