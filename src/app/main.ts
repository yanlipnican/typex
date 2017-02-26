import { Server } from 'typex/Server';

// Controllers
import { PostController } from 'app/controllers/PostController';

export class App extends Server{

    onInit() {

        this.controller(PostController);

    }

}