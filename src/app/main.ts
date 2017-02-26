import { Server } from 'system/Server';

// Controllers
import { PostController } from 'app/controllers/PostController';

export class App extends Server{

    onInit() {
        this.use(PostController);
    }

}