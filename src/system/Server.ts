import { Controller, RequestType } from 'system/Controller';

export class Server {

    // router = new Router(this.route || '');

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

            switch (type) {
                case RequestType.GET:
                    // this.router.get(path, method);
                    break;
                case RequestType.POST:
                    // this.router.post(path, method);
                    break;
            }

            // this.server.use(router);
        }

    }

}