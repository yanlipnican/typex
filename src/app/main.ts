import { Server } from '../typex/Server';

import * as mongoose from 'mongoose';

// Controllers
import { PostController } from './controllers/PostController';

export class App extends Server{

    onInit() {

        mongoose.connect(`mongodb://vagrant.dev/typex`);

        this.controller(PostController);

    }

}