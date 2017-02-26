import { Controller, RequestType } from 'system/Controller';

export class Server {

    constructor() {
        this.onInit();
    }

    /**
     * Part of lifecycle where you should attach your controllers
     * example: this.user(ExampleController)
     */
    public onInit(): void {}

    /**
     * Attach controller extended class
     */
    public use(controller: typeof Controller): void {

        let instance = new controller();
        let routes = instance.constructor.prototype._routes;

        for (let route of routes) {

            let method = route.method.value;
            let path: string = route.path;
            let type: RequestType = route.type;

            // let router = new Router(instance.route || '';

            switch (type) {
                case RequestType.GET:
                    // router.get(path, method);
                    break;
                case RequestType.POST:
                    // router.post(path, method);
                    break;
            }

            // this.server.use(router);
        }

    }

}